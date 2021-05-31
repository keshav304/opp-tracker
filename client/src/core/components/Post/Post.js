import React, { useState } from "react";
import moment from "moment";
import "./style.css";
import dotenv from "dotenv";
import { getCookie, isAuth } from "../../../auth/Helpers";
import { useHistory } from "react-router";
import { toast } from "react-toastify";
import axios from "axios";
dotenv.config();

const Post = ({ post }) => {
  const [isBookmarked,setIsBookmarked] = useState("bi bi-bookmark mx-2")
  const history = useHistory();
  console.log(isBookmarked)
  const handleBookmark = (event) => {
    if (isAuth() === undefined) {
      history.push("/signin");
      toast.error("please signin to save a post");
    } else {
      if (event.target.className === "bi bi-bookmark-fill mx-2") {
        axios({
          method: "POST",
          url: `${process.env.REACT_APP_DEPLOYED_API}/post/bookmark/delete`,
          data: {
            userId: isAuth()._id,
            postId:post._id
          }
        })
          .then((response) => {
            console.log("bookmark deleted");
            toast.success(response.data.message);
          })
          .catch((error) => {
            console.log("bookmark deletionerror");
            toast.error(error.response.data.error);
          });
      }
      setIsBookmarked( event.target.className === "bi bi-bookmark mx-2"
      ? "bi bi-bookmark-fill mx-2"
      : "bi bi-bookmark mx-2")
      event.target.className = isBookmarked;

      axios({
        method: "POST",
        url: `${process.env.REACT_APP_DEPLOYED_API}/post/bookmark`,
        data: {
          userId: isAuth()._id,
          post: {
            id: post._id,
            name: post.name,
            createdAt: post.createdAt,
            description: post.description,
            detailsLink: post.detailsLink,
            registrationLink: post.detailsLink,
            category: post.category,
          },
          headers: { Authorization: `Bearer ${getCookie("token")}` },
        }
      })
        .then((response) => {
          console.log("bookmark success");
          toast.success(response.data.message);
        })
        .catch((error) => {
          console.log("bookmark error");
          toast.error(error.response.data.error);
        });
    }
  };

  return (
    <div className="post my-3" style={{ backgroundColor: "#e4e4e4" }}>
      <div>
        <h1>{post.name}</h1>
        <p className="text-primary">
          Posted {moment(post.createdAt).fromNow()}
        </p>
        <p className="desc">{post.description}</p>

        <div className="d-flex justify-content-between mt-1  ">
          <div className="mt-2">
            <i
              className={isBookmarked}
              style={{ fontSize: "1.5rem" }}
              onClick={handleBookmark}
            ></i>
          </div>

          <div className="d-flex mb-3  ">
            <div className="me-3 mt-2">
              <a
                target="_blank"
                className="btn btn-info text-light"
                href={post.detailsLink}
              >
                More details
              </a>
            </div>

            <div className="me-2 mt-2">
              <a
                target="_blank"
                className="btn btn-info text-light"
                href={post.registrationLink}
              >
                Register Now
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
