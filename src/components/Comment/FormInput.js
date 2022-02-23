import React, { useEffect, useRef } from 'react';
// import { patchData } from '../../ultils/FetchData';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { patchDataAPI } from '../../api/fetchData';
function FormInput({ id, socket, rating, setReply, send, name }) {
    const nameRef = useRef();
    const contentRef = useRef();

    useEffect(() => {
        if (name) {
            contentRef.current.innerHTML = `
                <a href="#!"
                    style="
                    font-weight: 600;
                    text-reansform: capitatlize;
                    color: #ccc;
                    font-size: 14px;"
                >${name}: </a>
            `;
        }
    }, [name]);

    const commentClick = () => {
        const username = nameRef.current.value;

        const content = contentRef.current.innerHTML;

        if (!username.trim()) return alert('Không được để trống tên.');

        if (contentRef.current.textContent.trim().length < 10)
            return alert('Nội dung quá ngắn, nội dung lớn hơn 10 kí tự!');

        const createdAt = new Date().toISOString();

        socket.emit('createComment', {
            username,
            content,
            product_id: id,
            createdAt,
            rating,
            send,
        });

        if (rating && rating !== 0) {
            patchDataAPI(`products/${id}`, { rating });
        }

        contentRef.current.innerHTML = '';
        nameRef.current.value = '';

        if (setReply) setReply(false);
    };
    return (
        <div className="form_input mt-4">
            <div className="bg-gray-50 rounded">
                <TextField
                    style={{ width: '100%' }}
                    id="standard-basic"
                    inputRef={nameRef}
                    label="Nhập tên"
                    variant="filled"
                />
            </div>

            <div
                ref={contentRef}
                contentEditable="true"
                placeholder="Nhập đánh giá ..."
                className="rounded-lg bg-gray-50"
                style={{
                    height: '100px',
                    border: '1px solid #d9d9d9',
                    padding: '4px 11px',
                    outline: 'none',
                    color: '#000000d9',
                    fontSize: '14px',
                    margin: '10px 0',
                    transition: 'all .3s,height 0s',
                }}
            />
            <Button variant="contained" onClick={commentClick}>
                Gửi
            </Button>
        </div>
    );
}

export default FormInput;
