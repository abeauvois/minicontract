import React from 'react';
import { ref, getDatabase } from 'firebase/database';
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
  useListVals<Contract>(ref(database, 'contracts'), options);


const ReadList = () => {
  // const [snapshots, loading, error] = useList(ref(database, 'list'));
  const [values, loading, error] = useListVals<Contract>(ref(database, 'contract'), options);
  // console.log("🚀 ~ file: ReadList.tsx:11 ~ ReadList ~ snapshots:", snapshots?.map((v) => v.val()))

  return (
    <div>
      <p>
        {error && <strong>Error: {error.message}</strong>}
        {loading && <span>List: Loading...</span>}
        {!loading && values && (
          <React.Fragment>
            <span>
              List:{' '}
              {values.map((v) => (
                <React.Fragment key={v.name}>{v.name}:{v.age} </React.Fragment>
              ))}
            </span>
          </React.Fragment>
        )}
      </p>
    </div>
  );
};

export { ReadList }