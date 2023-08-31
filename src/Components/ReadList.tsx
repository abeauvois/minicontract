import React from 'react';
import { ref, getDatabase } from 'firebase/database';
import { useList, useListVals } from 'react-firebase-hooks/database';

import { app } from '../firebase';

const database = getDatabase(app);

type Item = {
    name: string;
    age: number;
};

const ReadList = () => {
    // const [snapshots, loading, error] = useList(ref(database, 'list'));
    const [values, loading, error] = useListVals<Item>(ref(database, 'list'));
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