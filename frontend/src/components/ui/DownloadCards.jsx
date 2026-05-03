import React from 'react';
import styled from 'styled-components';
import { Chrome, Globe, Code2 } from 'lucide-react';

const DownloadCards = () => {
  return (
    <div className="flex flex-wrap justify-center gap-8 w-full mb-16 relative z-20">
      <Card 
        title="AccessiBrowser" 
        desc="Audit live pages & internal dashboards instantly"
        href="/AccessiBrowser.zip"
        download="AccessiBrowser.zip"
        icon={<Chrome size={54} className="icon-svg" color="#FF5252" strokeWidth={1.5} />}
        color1="#ff8a80" color2="#ff5252"
        light1="#ffab91" light2="#ff7043"
        shadow="rgba(255, 138, 128, 0.4)"
      />
      <Card 
        title="AccessiSimulate" 
        desc="Experience web apps through disability simulators"
        href="/AccessiSimulate.zip"
        download="AccessiSimulate.zip"
        icon={<Globe size={54} className="icon-svg" color="#448AFF" strokeWidth={1.5} />}
        color1="#82B1FF" color2="#448AFF"
        light1="#80D8FF" light2="#00B0FF"
        shadow="rgba(68, 138, 255, 0.4)"
      />
      <Card 
        title="VS Code Ext." 
        desc="Fix accessibility issues directly in your IDE"
        href="https://marketplace.visualstudio.com/items?itemName=zahidham2985.accessiscan-vscode"
        icon={<Code2 size={54} className="icon-svg" color="#00BFA5" strokeWidth={1.5} />}
        color1="#64FFDA" color2="#00BFA5"
        light1="#A7FFEB" light2="#1DE9B6"
        shadow="rgba(0, 191, 165, 0.4)"
      />
    </div>
  );
};

const Card = ({ title, desc, href, download, icon, color1, color2, light1, light2, shadow }) => {
  return (
    <StyledWrapper style={{
      '--bg-color': `linear-gradient(135deg, ${color1}, ${color2})`,
      '--bg-color-light': `linear-gradient(135deg, ${light1}, ${light2})`,
      '--box-shadow-color': shadow
    }}>
      <a href={href} download={download} target={download ? undefined : "_blank"} rel="noreferrer" className="card wallet gradient">
        <span className="top-text">Click to Visit</span>
        <div className="overlay" />
        <div className="circle">
          {icon}
        </div>
        <p className="title">{title}</p>
        <span className="desc">{desc}</span>
      </a>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  .wallet.gradient {
    --text-color-hover: #ffffff;
  }

  .card {
    width: 220px;
    height: 321px;
    background: linear-gradient(135deg, #ffe0b2, #ffcc80);
    border-top-right-radius: 10px;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: relative;
    box-shadow: 0 14px 26px rgba(0, 0, 0, 0.08);
    transition: all 0.3s ease-out;
    text-decoration: none;
  }

  .card .top-text {
    position: absolute;
    top: 20px;
    font-size: 10px;
    font-weight: 800;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: #8d6e63;
    z-index: 1000;
    transition: all 0.3s ease-out;
    opacity: 0.6;
  }

  .card:hover .top-text {
    color: var(--text-color-hover);
    opacity: 0.9;
    transform: translateY(-2px);
  }

  .card:hover {
    transform: translateY(-5px) scale(1.005);
    box-shadow:
      0 24px 36px rgba(0, 0, 0, 0.1),
      0 24px 46px var(--box-shadow-color);
  }

  .card:hover .overlay {
    transform: scale(3.5);
  }

  .card:hover .circle {
    border-color: var(--bg-color-light);
    background: var(--bg-color);
  }

  .card:hover .circle:after {
    background: var(--bg-color-light);
  }

  .card:hover .title,
  .card:hover .desc {
    color: var(--text-color-hover);
  }
  
  .card:hover .icon-svg {
    stroke: #ffffff;
    color: #ffffff;
  }

  .card .title {
    font-size: 17px;
    color: #5d4037;
    margin-top: 30px;
    margin-bottom: 6px;
    z-index: 1000;
    transition: color 0.3s ease-out;
    font-weight: 900;
    text-align: center;
  }

  .card .desc {
    font-size: 11px;
    color: #8d6e63;
    z-index: 1000;
    text-align: center;
    padding: 0 16px;
    transition: color 0.3s ease-out;
    line-height: 1.4;
    font-weight: 600;
  }

  .circle {
    width: 131px;
    height: 131px;
    border-radius: 50%;
    background: #ffffff;
    border: 2px solid var(--bg-color);
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    z-index: 1;
    transition: all 0.3s ease-out;
  }

  .circle:after {
    content: "";
    width: 118px;
    height: 118px;
    display: block;
    position: absolute;
    background: var(--bg-color);
    border-radius: 50%;
    top: 4.5px;
    left: 4.5px;
    transition: opacity 0.3s ease-out;
    opacity: 0;
  }

  .card:hover .circle:after {
    opacity: 1;
  }

  .circle svg {
    z-index: 10000;
    transition: all 0.3s ease-out;
  }

  .overlay {
    width: 118px;
    height: 118px;
    border-radius: 50%;
    background: var(--bg-color);
    position: absolute;
    top: 70px;
    left: 50px;
    z-index: 0;
    transition: transform 0.3s ease-out;
  }
`;

export default DownloadCards;
