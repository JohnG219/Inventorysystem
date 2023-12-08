import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { menuItems } from "../../utils/menuItems";
import Swal from "sweetalert2";

function Navigation({ active, setActive }) {
  const [profilePicture, setProfilePicture] = useState(null);

  useEffect(() => {
    const savedProfilePicture = localStorage.getItem("profilePicture");
    if (savedProfilePicture) {
      setProfilePicture(savedProfilePicture);
    }
  }, []);

  const handleImageUpload = (event) => {
    const selectedImage = event.target.files[0];
    setProfilePicture(URL.createObjectURL(selectedImage));
  };

  const handleSave = () => {
    if (profilePicture) {
      const canvas = document.createElement("canvas");
      const img = document.createElement("img");
      img.src = profilePicture;
      img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, img.width, img.height);
        const base64Data = canvas.toDataURL("image/jpeg"); 
        localStorage.setItem("profilePicture", base64Data);
        console.log("Profile picture saved:", profilePicture);
        Swal.fire({
          icon: "success",
          title: "Profile Picture Change",
          text: "Your profile picture has been saved successfully.",
        });
      };
    }
  };


  return (
    <NavStyled>
      <div className="user-con">
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          id="profile-image-upload"
          style={{ display: "none" }}
        />
        <label htmlFor="profile-image-upload" style={{ cursor: "pointer" }}>
          <img
            src={
              profilePicture ? profilePicture : "default-placeholder-image-url"
            }
            alt="Profile"
          />
        </label>
        <button className="savebtn" onClick={handleSave}>
          Save
        </button>
        <div className="text">
          <h2>JOHNE</h2>
          <p>Inventory</p>
        </div>
      </div>
      <ul className="menu-items">
        {menuItems.map((item) => {
          return (
            <li
              key={item.id}
              onClick={() => setActive(item.id)}
              className={active === item.id ? "active" : ""}
            >
              {item.icon}
              <span>{item.title}</span>
            </li>
          );
        })}
      </ul>
    </NavStyled>
  );
}

const NavStyled = styled.nav`
  padding: 2rem 1.5rem;
  width: 374px;
  height: 100vh;
  background-color: #ffffff;
  border: 3px solid #ffffff;
  backdrop-filter: blur(4.5px);
  border-radius: 14px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 2rem;
  .user-con {
    height: 100px;
    display: flex;
    align-items: center;
    gap: 1rem;
    img {
      width: 120px;
      height: 120px;
      border-radius: 50%;
      object-fit: cover;
      background: #fcf6f9;
      border: 2px solid #ffffff;
      padding: 0.2rem;
      box-shadow: 0px 1px 17px rgba(0, 0, 0, 0.06);
    }
    h2 {
      color: #28282b;
    }
    p {
      color: #28282b;
    }
  }

  .savebtn {
    color: #fff;
    background-color: #0071c2;
    border-style: none;
    height: 32px;
    width: 50px;
    cursor: pointer;
  }
  .menu-items {
    flex: 1;
    display: flex;
    flex-direction: column;
    li {
      display: grid;
      grid-template-columns: 40px auto;
      align-items: center;
      margin: 1.6rem 0;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.4s ease-in-out;
      color: rgba(34, 34, 96, 0.6);
      padding-left: 1rem;
      position: relative;
      i {
        color: rgba(34, 34, 96, 0.6);
        font-size: 1.4rem;
        transition: all 0.4s ease-in-out;
      }
    }
  }

  .active {
    color: rgba(34, 34, 96, 1) !important;
    i {
      color: rgba(34, 34, 96, 1) !important;
    }
    &::before {
      content: "";
      position: absolute;
      left: 0;
      top: 0;
      width: 4px;
      height: 100%;
      background: #222260;
      border-radius: 0 10px 10px 0;
    }
  }
`;

export default Navigation;
