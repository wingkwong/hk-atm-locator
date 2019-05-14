import { allBanks } from '../constants/banks';

const findBankNameByIdx = (idx) => {
    const bank = allBanks.filter(bank => {
        return bank.idx === idx;
    });
    return bank[0] ? bank[0].en : '';
}

export {
    findBankNameByIdx
}