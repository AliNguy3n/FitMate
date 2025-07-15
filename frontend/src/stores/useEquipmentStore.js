import { create } from "zustand";
import BestEquipmentsData from "../data/best_equipments.json";
import EquipmentsData from "../data/equipments.json";
import EquipmentDetailData from "../data/equipment_dto.json";


const useEquipmentStore = create((set) => ({
  equipments: [],
  bestEquipments: BestEquipmentsData,
  getDetail: (id) => EquipmentDetailData, // use api to get with product id
  fetchEquipments: () =>
    set({equipments: EquipmentsData})
}));

export default useEquipmentStore;
