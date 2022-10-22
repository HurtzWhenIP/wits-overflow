import create from 'zustand';
import { devtools, persist } from 'zustand/middleware';

let store = (set) => ({
    userObj: null,
    setUserobj: (obj) => set((state) => ({ userObj: obj })),
    open: false,
    setOpen: (value) => set((state) => ({open: value})),
    question: null,
    setQuestion: (value) => set((state) =>({question: value})),
    userObjExplore: null,
    setUserobjexplore: (value) => set((state) => ({userObjExplore: value})),
    currPost: null,
    setCurrpost: (value) => set((state) => ({currPost: value})),
});

store = devtools(store);
store = persist(store, { name: 'user_data' });

const useStore = create(store);

export default useStore;