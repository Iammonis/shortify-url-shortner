import React from "react";
import axios from "axios";
import styled from "styled-components";
import { AppContext } from "../Context/AppContext";

const HomeDiv = styled.div`
  width: 100vw;
  min-height: 100vh;
  background: ${(props) => props.theme.bodyBackground};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: ${(props) => props.theme.primaryColor};

  .wrapper {
    max-width: 1024px;
    width: 100%;
    display: grid;
    place-items: center;
  }

  .shortLink {
    width: 100%;
    min-height: 70px;
    background: ${(props) => props.theme.primaryColor};
    color: ${(props) => props.theme.secondaryColor};
    display: flex;
    align-items: center;
    padding: 0 20px;
    border-radius: 8px;
    justify-content: space-between;
    flex-wrap: wrap;
    max-height: 200px;

    a {
      color: #1779ba;
      text-decoration: none;
      cursor: pointer;
      font-size: 18px;
    }
  }

  .empty {
    width: 100%;
    min-height: 70px;
    background: #f66e6e;
    color: ${(props) => props.theme.secondaryColor};
    display: flex;
    align-items: center;
    border-radius: 8px;
    flex-wrap: wrap;
    justify-content: center;
    font-size: 18px;
  }

  .img {
    width: 100%;
    display: flex;
    justify-content: center;
    max-width: 100%;

    img {
      width: fit-content;
      max-width: 100%;
      object-fit: contain;
    }
  }

  .shortLinkInfo {
    flex-wrap: wrap;
    width: 100%;
    min-height: 70px;
    max-height: 200px;
    background: ${(props) => props.theme.primaryColor};
    color: ${(props) => props.theme.secondaryColor};
    display: flex;
    align-items: center;
    border-radius: 8px;
    flex-wrap: wrap;
    justify-content: center;

    p {
      text-align: center;
      padding: 0 20px;
    }

    a {
      color: #1779ba;
      text-decoration: none;
      cursor: pointer;
      font-size: 18px;
    }
  }

  .center {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    max-width: 100%;
    min-height: 200px;

    input {
      min-height: 70px;
      /* max-width: 500px; */
      width: 75%;
      max-width: 75%;
      border-radius: 8px;
      border: none;
      padding: 0 20px;
      margin-right: 40px;
      outline: none;
      font-size: 18px;
    }

    button {
      max-width: 25%;
      min-height: 70px;
      /* margin: 0 20px; */
      width: 25%;
      border-radius: 8px;
      border: none;
      background-color: ${(props) => props.theme.buttonColor};
      color: ${(props) => props.theme.secondaryColor};
      font-size: 18px;
      cursor: pointer;
    }
  }

  @media (max-width: 400px) {
    .center > input {
      margin-right: 20px;
    }
  }
`;

export const Home = () => {
  const [url, setUrl] = React.useState("");
  const [shortLink, setShortLink] = React.useState(null);
  const [canSubmit, setCanSubmit] = React.useState(true);
  const [error, setError] = React.useState(null);
  const { currentTheme, theme } = React.useContext(AppContext);

  const handleSubmit = () => {
    if (canSubmit && url !== "") {
      setCanSubmit((prev) => !prev);
      setShortLink(null);
      axios
        .post("https://url-shortner-shortify.herokuapp.com/cut", {
          url,
        })
        .then((res) => setShortLink({ long: url, short: res.data }))
        .catch((err) => {
          setError(err.message);
          setTimeout(() => {
            setError(null);
          }, 3000);
        })
        .finally(() => {
          setCanSubmit((prev) => !prev);
          setUrl("");
        });
    } else if (url === "") {
      setError("Input is empty");
      setTimeout(() => {
        setError(null);
      }, 3000);
    }
  };

  return (
    <HomeDiv theme={theme}>
      <div className="wrapper">
        <div className="img">
          <img
            src={
              currentTheme === "dark"
                ? "https://i.imgur.com/kXXamiy.png"
                : "https://i.imgur.com/mof54F3.png"
            }
            alt=""
          />
        </div>
        <div className="center">
          <input
            placeholder="Shorten your link"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            type="text"
          />
          <button onClick={handleSubmit}>Shorten</button>
        </div>

        {error && <div className="empty">{error}</div>}

        {shortLink && (
          <div className="shortLink">
            <p>{`${shortLink.long.substring(0, 60)}${
              shortLink.long.length > 60 ? "..." : ""
            }`}</p>
            <a
              target="_blank"
              rel="noreferrer"
              href={`https://shortify-rose.vercel.app/${shortLink.short.code}`}
            >{`https://shortify-rose.vercel.app/${shortLink.short.code}`}</a>
          </div>
        )}
        {shortLink && (
          <div className="shortLinkInfo" style={{ marginTop: "20px" }}>
            <p>
              Use this link to check the stats of your short link{" "}
              <a
                target="_blank"
                rel="noreferrer"
                href={`https://shortify-rose.vercel.app/stats/${shortLink.short.code}`}
              >{`https://shortify-rose.vercel.app/stats/${shortLink.short.code}`}</a>
            </p>
          </div>
        )}
      </div>
    </HomeDiv>
  );
};
