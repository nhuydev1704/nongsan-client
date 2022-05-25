import React from 'react';
import { getDataAPI } from '../../api/fetchData';

const PrivateWebview = () => {
    const [privateData, setPrivateData] = React.useState('');

    React.useEffect(() => {
        (async () => {
            const res = await getDataAPI('policy');
            setPrivateData(res.data[0]?.private);
        })();
    }, []);

    return (
        <div className="p-4">
            <div className="content_policy" dangerouslySetInnerHTML={{ __html: privateData }} />
        </div>
    );
};

export default PrivateWebview;
