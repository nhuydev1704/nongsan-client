import Drawer from '@mui/material/Drawer';
import * as React from 'react';

const Notification = ({ openDraw, setOpenDraw }) => {
    return (
        <div>
            <Drawer anchor="right" open={openDraw} onClose={() => setOpenDraw(false)}>
                <div className="bg-[#fff] h-full">
                    <div className="p-3 text-left text-lg font-medium" style={{ borderBottom: '1px solid #ccc' }}>
                        Thông báo
                    </div>
                    <div className="p-4 xs:w-0" style={{ width: 400, background: '#fff' }}>
                        ihiih
                    </div>
                </div>
            </Drawer>
        </div>
    );
};

export default Notification;
