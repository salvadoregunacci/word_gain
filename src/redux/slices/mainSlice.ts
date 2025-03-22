import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IAlert, ICategory, IChallange, IList, IListWithCategory, ISavedData} from "../../types.ts";
import {AppDispatch} from "../store.ts";

interface IState {
    isOpenMenu: boolean,
    selectedCategory: ICategory | null,
    selectedChallenge: IChallange | null,
    isShowOverlay: boolean,
    categories: ICategory[],
    alert: IAlert | null,
}

export const showAlert = createAsyncThunk<
    void,
    IAlert,
    {
        dispatch: AppDispatch
    }
>(
    "main/showAlert",
    async (alert, {dispatch}) => {
        dispatch(__showAlert(alert));
        await new Promise((resolve) => setTimeout(resolve, alert.lifetime));
        dispatch(__hideAlert());
    }
);


const initialState: IState = {
    isOpenMenu: false,
    selectedCategory: null,
    selectedChallenge: null,
    isShowOverlay: false,
    alert: null,
    categories: [],
}

const mainSlice = createSlice({
    name: 'main',
    initialState,
    reducers: {
        createList(state, action: PayloadAction<IListWithCategory>) {
            const {category: categoryName, ...newListData} = action.payload;

            state.categories = state.categories.map(cat => {
                if (cat.name !== categoryName) return cat;

                let suffix = 1;
                let baseName = newListData.name;
                let newName = baseName;

                while (cat.lists.some(list => list.name === newName)) {
                    suffix++;
                    newName = `${baseName}${suffix}`;
                }

                const newList: IList = {...newListData, name: newName};

                return {...cat, lists: [...cat.lists, newList]};
            });

            if (state.selectedCategory?.name === categoryName) {
                state.selectedCategory = {
                    ...state.selectedCategory,
                    lists: [...state.selectedCategory.lists, {...newListData, name: newListData.name}],
                };
            }

            const saveData = window.localStorage.getItem("data");
            if (saveData) {
                const parsedData = JSON.parse(saveData) as ISavedData;
                const updatedCategories = parsedData.categories.map(cat =>
                    cat.name === categoryName ? {...cat, lists: [...cat.lists, newListData]} : cat
                );

                window.localStorage.setItem("data", JSON.stringify({categories: updatedCategories}));
            } else {
                window.localStorage.setItem(
                    "data",
                    JSON.stringify({categories: [{name: categoryName, lists: [newListData]}]})
                );
            }
        },
        createCategory(state, action: PayloadAction<ICategory>) {
            let suffix = 1;
            let baseName = action.payload.name;
            let newName = baseName;

            while (state.categories.some(category => category.name === newName)) {
                suffix++;
                newName = `${baseName}${suffix}`;
            }

            const newCategory: ICategory = {...action.payload, name: newName};

            state.categories = [...state.categories || [], newCategory];

            const saveData = window.localStorage.getItem("data");
            if (saveData) {
                const parsedData = JSON.parse(saveData) as ISavedData;
                window.localStorage.setItem("data", JSON.stringify({
                    categories: [...parsedData.categories, newCategory]
                }));
            } else {
                window.localStorage.setItem("data", JSON.stringify({
                    categories: [newCategory]
                }));
            }
        },
        deleteCategory(state, action: PayloadAction<string>) {
            const categoryName = action.payload;

            state.categories = state.categories.filter(cat => cat.name !== categoryName);

            if (state.selectedCategory?.name === categoryName) {
                state.selectedCategory = null;
            }

            const saveData = window.localStorage.getItem("data");
            if (saveData) {
                const parsedData = JSON.parse(saveData) as ISavedData;
                const updatedCategories = parsedData.categories.filter(cat => cat.name !== categoryName);
                window.localStorage.setItem("data", JSON.stringify({categories: updatedCategories}));
            }
        },
        deleteList(state, action: PayloadAction<{ category: string; listName: string }>) {
            const {category: categoryName, listName} = action.payload;

            state.categories = state.categories.map(cat =>
                cat.name === categoryName
                    ? {...cat, lists: cat.lists.filter(list => list.name !== listName)}
                    : cat
            );

            if (state.selectedCategory?.name === categoryName) {
                state.selectedCategory = {
                    ...state.selectedCategory,
                    lists: state.selectedCategory.lists.filter(list => list.name !== listName),
                };
            }

            const saveData = window.localStorage.getItem("data");
            if (saveData) {
                const parsedData = JSON.parse(saveData) as ISavedData;
                const updatedCategories = parsedData.categories.map(cat =>
                    cat.name === categoryName
                        ? {...cat, lists: cat.lists.filter(list => list.name !== listName)}
                        : cat
                );

                window.localStorage.setItem("data", JSON.stringify({categories: updatedCategories}));
            }
        },
        renameCategory(state, action: PayloadAction<{ oldName: string; newName: string }>) {
            const {oldName, newName: baseNewName} = action.payload;

            let suffix = 1;
            let newName = baseNewName;

            while (state.categories.some(category => category.name === newName)) {
                suffix++;
                newName = `${baseNewName}${suffix}`;
            }

            state.categories = state.categories.map(cat =>
                cat.name === oldName ? {...cat, name: newName} : cat
            );

            if (state.selectedCategory?.name === oldName) {
                state.selectedCategory = {...state.selectedCategory, name: newName};
            }

            const saveData = window.localStorage.getItem("data");
            if (saveData) {
                const parsedData = JSON.parse(saveData) as ISavedData;
                const updatedCategories = parsedData.categories.map(cat =>
                    cat.name === oldName ? {...cat, name: newName} : cat
                );
                window.localStorage.setItem("data", JSON.stringify({categories: updatedCategories}));
            }
        },

        renameList(state, action: PayloadAction<{ categoryName: string; oldName: string; newName: string }>) {
            const {categoryName, oldName, newName: baseNewName} = action.payload;

            let suffix = 1;
            let newName = baseNewName;

            const category = state.categories.find(cat => cat.name === categoryName);
            if (category) {
                while (category.lists.some(list => list.name === newName)) {
                    suffix++;
                    newName = `${baseNewName}${suffix}`;
                }
            }

            state.categories = state.categories.map(cat => {
                if (cat.name !== categoryName) return cat;

                const updatedLists = cat.lists.map(list =>
                    list.name === oldName ? {...list, name: newName} : list
                );

                return {...cat, lists: updatedLists};
            });

            if (state.selectedCategory?.name === categoryName) {
                state.selectedCategory = {
                    ...state.selectedCategory,
                    lists: state.selectedCategory.lists.map(list =>
                        list.name === oldName ? {...list, name: newName} : list
                    ),
                };
            }

            const saveData = window.localStorage.getItem("data");
            if (saveData) {
                const parsedData = JSON.parse(saveData) as ISavedData;
                const updatedCategories = parsedData.categories.map(cat =>
                    cat.name === categoryName
                        ? {
                            ...cat,
                            lists: cat.lists.map(list =>
                                list.name === oldName ? {...list, name: newName} : list
                            ),
                        }
                        : cat
                );

                window.localStorage.setItem("data", JSON.stringify({categories: updatedCategories}));
            }
        },
        changeMenuVisability(state, action: PayloadAction<boolean>) {
            state.isOpenMenu = action.payload;
        },
        parseSavedData(state, action: PayloadAction<string>) {
            const parsedData = JSON.parse(action.payload) as ISavedData;

            if (parsedData.categories) {
                state.categories = parsedData.categories;
            }
        },
        setSelectedCategory(state, action: PayloadAction<ICategory | null>) {
            state.selectedCategory = action.payload;
        },
        setChallenge(state, action: PayloadAction<IChallange | null>) {
            state.selectedChallenge = action.payload;
        },
        setVisibleOverlay(state, action: PayloadAction<boolean>) {
            state.isShowOverlay = action.payload;
        },
        __showAlert(state, action: PayloadAction<IAlert>) {
            state.alert = action.payload;
        },
        __hideAlert(state) {
            state.alert = null;
        }
    },
})

export const {
    changeMenuVisability,
    parseSavedData,
    setSelectedCategory,
    setChallenge,
    setVisibleOverlay,
    createList,
    createCategory,
    deleteCategory,
    renameList,
    renameCategory,
    deleteList,
    __showAlert,
    __hideAlert,
} = mainSlice.actions;
export default mainSlice.reducer;
