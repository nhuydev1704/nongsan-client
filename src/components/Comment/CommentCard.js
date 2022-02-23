import React from 'react';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import Rating from '@mui/material/Rating';
import moment from 'moment';
import Avatar from '@mui/material/Avatar';

function CommentCard({ children, comment, reply }) {
    return (
        <div className={reply ? 'comment_card comment_card-reply' : 'comment_card comment_card-noreply'}>
            <div className="comment_card_row">
                <div style={{ display: 'flex', alignItems: 'center', color: 'white' }}>
                    <Avatar src="https://joeschmoe.io/api/v1/random" alt="Han Solo" />
                    <h3 className="text-white ml-2 mr-1">{comment.username}</h3>
                    <div className="flex items-center justify-between">
                        <span className="text-white">{moment(comment.createdAt).fromNow()}</span>
                        {comment.rating !== 0 && (
                            <Rating
                                name="simple-controlled"
                                style={{ color: 'yellow', paddingTop: '20px', position: 'absolute', right: 0 }}
                                value={comment.rating}
                                precision={0.1}
                                readOnly
                                size="small"
                                emptyIcon={<StarBorderIcon fontSize="inherit" style={{ color: 'yellow' }} />}
                            />
                        )}
                    </div>
                </div>
            </div>

            <p
                className="mar-left text-white"
                style={{ textTransform: 'capitalize', color: 'white !important' }}
                dangerouslySetInnerHTML={{ __html: comment.content }}
            ></p>

            {children}
        </div>
    );
}

export default CommentCard;
