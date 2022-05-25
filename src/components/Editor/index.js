import React from 'react';
import { Editor } from '@tinymce/tinymce-react';
const imageUpload = async (file) => {
    const formData = new FormData();

    formData.append('file', file);
    formData.append('upload_preset', 'breqd0hm');
    formData.append('cloud_name', 'hunre');

    const res = await fetch('https://api.cloudinary.com/v1_1/hunre/image/upload', {
        method: 'POST',
        body: formData,
    });

    const data = await res.json();
    return { public_id: data.public_id, url: data.secure_url };
};

const checkImage = (file) => {
    const types = ['image/png', 'image/jpeg'];
    let err = '';
    if (!file) return (err = 'Tập tin không tồn tại.');

    if (file.size > 1024 * 1024) err = 'Kích cỡ vượt quá 1mb.';

    if (!types.includes(file.type)) err = 'Ảnh không đúng định dạnh png / jpg.';

    return err;
};

const RichEditor = ({ body, setBody }) => {
    const handleEditorChange = (content, editor) => {
        setBody(content);
    };

    return (
        <>
            <input id="my-file-upload" accept="image/*" type="file" name="my-file-upload" style={{ display: 'none' }} />
            <Editor
                init={{
                    default_link_target: '_blank',
                    height: 500,
                    menubar: true,
                    statubar: true,
                    content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
                    paste_data_images: true,
                    file_browser_callback_types: 'image',
                    file_picker_callback: async function (callback, value, meta) {
                        if (meta?.filetype === 'image') {
                            let input = document.getElementById('my-file-upload');
                            input.click();
                            input.onchange = async () => {
                                var file = input.files[0];
                                const check = await checkImage(file);
                                if (check !== '' && check) {
                                    return;
                                }
                                const photo = await imageUpload(file);
                                if (photo.url) {
                                    callback(photo.url, {
                                        alt: file.name,
                                    });
                                }
                            };
                        }
                    },
                }}
                value={body}
                onEditorChange={handleEditorChange}
                apiKey="hjuz02bsvcykwi6ruki9xpuarsd6l8txzaouzknog6xef2w5"
                scriptLoading={{ async: true }}
            />
        </>
    );
};

export default RichEditor;
