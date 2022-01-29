export const validateEmail = (email) => {
    return String(email)
        .toLowerCase()
        .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
};

// create function format number
export const formatNumber = (number) => {
    return number.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
};

export function isNumber(num) {
    return !isNaN(parseFloat(num)) && isFinite(num);
}

export const imageUpload = async (file) => {
    const formData = new FormData();

    formData.append('file', file);
    formData.append('upload_preset', 'qzgwftg1');
    formData.append('cloud_name', 'hunre');

    const res = await fetch('https://api.cloudinary.com/v1_1/hunre/upload', {
        method: 'POST',
        body: formData,
    });

    const data = await res.json();
    return { public_id: data.public_id, url: data.secure_url };
};
