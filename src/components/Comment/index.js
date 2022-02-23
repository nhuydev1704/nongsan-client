import StarBorderIcon from '@mui/icons-material/StarBorder';
import Rating from '@mui/material/Rating';
import React from 'react';
import CommentItem from './CommentItem';
import FormInput from './FormInput';

const Comment = ({ comments, id, socket }) => {
    const [rating, setRating] = React.useState(0);
    const [loading, setLoading] = React.useState(false);

    return (
        <div className="comments w-full pb-4 bg-[rgba(255,255,255,.05)] rounded-2xl text-cyan-50">
            <h2>Đánh Giá - Nhận Xét</h2>

            <div className="flex justify-between">
                <div className="w-[34%] ml-4">
                    <div className="flex">
                        <div className="mr-2">Đánh giá | </div>
                        <Rating
                            name="simple-controlled"
                            style={{ color: 'yellow' }}
                            value={rating}
                            precision={1}
                            onChange={(event, newValue) => {
                                setRating(newValue);
                            }}
                            size="medium"
                            emptyIcon={<StarBorderIcon fontSize="inherit" style={{ color: 'yellow' }} />}
                        />
                    </div>

                    <FormInput id={id} socket={socket} rating={rating} />
                </div>
                <div className="w-[60%]">
                    <div className="comments_list">
                        {comments.map((comment) => (
                            <CommentItem key={comment._id} comment={comment} socket={socket} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Comment;
