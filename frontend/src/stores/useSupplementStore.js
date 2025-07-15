import {create} from "zustand";

import BestSupplementsData from "../data/best_supplements.json";
import SupplementDetailData from "../data/supplement_dto.json";

const useSupplementStore = create((set) => ({
    bestSupplements: BestSupplementsData,
    getDetail: (id) => SupplementDetailData, // use api to get with product id
}));

export default useSupplementStore;