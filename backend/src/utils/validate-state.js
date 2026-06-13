import { AppError } from './AppError.js';
import statesData from './state-list.json' with {type: "json"};

export function validateLocation(stateName, districtName) {
    const checkState = statesData.states.find(s => s.state.toLocaleLowerCase === stateName.toLocaleLowerCase);
    if (!checkState) throw new AppError('State not Found', 404);

    const checkDistrict = checkState.districts.find(d => d.toLocaleLowerCase === districtName.toLocaleLowerCase);
    if (!checkDistrict) throw new AppError('District not match', 404);
}