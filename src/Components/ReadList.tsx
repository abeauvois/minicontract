import React from 'react';
import { ref, getDatabase } from 'firebase/database';
import { useList } from 'react-firebase-hooks/database';

import { app } from '../firebase';

const database = getDatabase(app);

const ReadList = () => {
    const [snapshots, loading, error] = useList(ref(database, 'list'));
    console.log("🚀 ~ file: ReadList.tsx:11 ~ ReadList ~ snapshots:", snapshots?.map((v) => v.val()))

    return (
        <div>
            <p>
                {error && <strong>Error: {error.message}</strong>}
                {loading && <span>List: Loading...</span>}
                {!loading && snapshots && (
                    <React.Fragment>
                        <span>
                            List:{' '}
                            {snapshots.map((v) => (
                                <React.Fragment key={v.key}>{v.val()}, </React.Fragment>
                            ))}
                        </span>
                    </React.Fragment>
                )}
            </p>
        </div>
    );
};

export { ReadList }