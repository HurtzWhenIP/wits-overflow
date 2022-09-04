import create from 'zustand';
import { devtools, persist } from 'zustand/middleware';

let store = (set) => ({
    userObj: null,
    setUserobj: (obj) => set((state) => ({ userObj: obj })),
});

store = devtools(store);
store = persist(store, { name: 'user_data' });

const useStore = create(store);

export default useStore;