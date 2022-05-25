import React from 'react';
import { getDataAPI } from '../../api/fetchData';

const RulesWebview = () => {
    const [rules, setRules] = React.useState('');

    React.useEffect(() => {
        (async () => {
            const res = await getDataAPI('policy');
            setRules(res.data[0]?.rules);
        })();
    }, []);

    return (
        <div className="p-4">
            <div className="content_policy" dangerouslySetInnerHTML={{ __html: rules }} />
        </div>
    );
};

export default RulesWebview;
