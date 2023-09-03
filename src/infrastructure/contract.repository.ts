import { ref, getDatabase, set, get } from 'firebase/database';
import { useListVals, useObjectVal } from 'react-firebase-hooks/database';

import { app } from '../firebase';
import { Contract } from '../domain/contracts';

const database = getDatabase(app);

const options = {
    keyField: 'contractId',
    transform: (val: Contract) => ({
        ...val,
        createdAt: val.createdAt,
    }),
};

const useContract: (
    contractId: string
) => [Contract | undefined, boolean, any] = (contractId) =>
        useObjectVal<Contract>(ref(database, `contracts/${contractId}`), options);

const useContracts: () => [Contract[] | undefined, boolean, any] = () =>
    useListVals<Contract>(ref(database, 'contracts'), /* options */);

const getContract = (contract: Contract) => get(ref(database, `contracts/${contract.id}`))
const setContract = (contract: Contract) => set(ref(database, `contracts/${contract.id}`), contract)

export { getContract, setContract, useContracts }