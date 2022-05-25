import { Button } from '@mui/material';
import React from 'react';
import { getDataAPI, patchDataAPI, postDataAPI, putDataAPI } from '../../api/fetchData';
import RichEditor from '../../components/Editor';
import LayoutComponent from '../../components/global/LayoutComponent';
const Policy = () => {
    const [rules, setRules] = React.useState('');
    const [privateValue, setPrivateValue] = React.useState('');
    const [id, setId] = React.useState('');

    React.useEffect(() => {
        (async () => {
            const res = await getDataAPI('policy');
            setRules(res.data[0]?.rules);
            setPrivateValue(res.data[0]?.private);
            setId(res.data[0]?._id);
        })();
    }, []);

    const handleSave = async () => {
        if (id) {
            await putDataAPI('policy/' + id, { rules, private: privateValue });
        } else {
            await postDataAPI('policy', { rules, private: privateValue });
        }
    };

    return (
        <LayoutComponent>
            <div className="flex mt-6 justify-end">
                <Button onClick={handleSave} variant="contained">
                    Lưu
                </Button>
            </div>
            <div className="bg-white p-6 mt-6 rounded-xl shadow-xl">
                <h2>Điều khoản và điều kiện</h2>
                <RichEditor body={rules} setBody={setRules} />
            </div>
            <div className="bg-white p-6 mt-6 rounded-xl shadow-xl">
                <h2>Chinhs sách quyền riêng tư</h2>
                <RichEditor body={privateValue} setBody={setPrivateValue} />
            </div>
        </LayoutComponent>
    );
};

export default Policy;
