import React from 'react';
import styled from 'styled-components';

export default function FeatureCard({ title, desc, icon: Icon, color, gradient }) {
  return (
    <StyledWrapper gradient={gradient}>
      <div className="card shadow-2xl">
        <div className="content">
          {/* Back (Initial face before hover in this specific CSS) */}
          <div className="back">
            <div className="back-content">
              <Icon size={56} className={color} strokeWidth={1.5} />
              <strong className="text-xl px-2 text-center text-slate-100">{title}</strong>
              <span className="text-xs text-slate-400 opacity-80 uppercase tracking-widest mt-2 border border-slate-700 px-3 py-1 rounded-full bg-slate-900/50">Hover to explore</span>
            </div>
          </div>
          
          {/* Front (Revealed on hover) */}
          <div className="front">
            <div className="img">
              <div className="circle"></div>
              <div className="circle" id="right"></div>
              <div className="circle" id="bottom"></div>
            </div>
            <div className="front-content">
              <div className="badge flex items-center gap-2 text-white font-medium shadow-md">
                <Icon size={14} /> {title}
              </div>
              <div className="description">
                <div className="title flex items-center gap-2">
                   <p className="title text-sm tracking-wide font-bold text-white mb-2 uppercase">Platform Feature</p>
                </div>
                <p className="card-footer text-xs font-medium text-slate-200 leading-relaxed drop-shadow-md">
                  {desc}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  .card {
    overflow: visible;
    width: 280px;
    height: 340px;
    margin: 0 auto;
  }

  .content {
    width: 100%;
    height: 100%;
    transform-style: preserve-3d;
    transition: transform 400ms cubic-bezier(0.25, 0.46, 0.45, 0.94);
    box-shadow: 0px 15px 35px rgba(0,0,0,0.5);
    border-radius: 16px;
  }

  .front, .back {
    background-color: var(--bg-surface-deep);
    position: absolute;
    width: 100%;
    height: 100%;
    backface-visibility: hidden;
    -webkit-backface-visibility: hidden;
    border-radius: 16px;
    overflow: hidden;
  }

  .back {
    width: 100%;
    height: 100%;
    justify-content: center;
    display: flex;
    align-items: center;
    overflow: hidden;
  }

  /* Rotating Gradient border */
  .back::before {
    position: absolute;
    content: ' ';
    display: block;
    width: 180px;
    height: 200%;
    background: linear-gradient(90deg, transparent, ${props => props.gradient || '#6C63FF'}, ${props => props.gradient || '#6C63FF'}, ${props => props.gradient || '#6C63FF'}, ${props => props.gradient || '#6C63FF'}, transparent);
    animation: rotation_481 5000ms infinite linear;
  }

  .back-content {
    position: absolute;
    width: 98%;
    height: 98%;
    background-color: var(--bg-surface);
    border-radius: 14px;
    color: white;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 16px;
  }

  .card:hover .content {
    transform: rotateY(180deg) scale(1.05);
    cursor: pointer;
  }

  @keyframes rotation_481 {
    0% { transform: rotateZ(0deg); }
    100% { transform: rotateZ(360deg); }
  }

  .front {
    transform: rotateY(180deg);
    color: white;
  }

  .front .front-content {
    position: absolute;
    width: 100%;
    height: 100%;
    padding: 24px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .front-content .badge {
    background-color: var(--bg-surface-deep);
    padding: 8px 16px;
    border-radius: 12px;
    backdrop-filter: blur(8px);
    border: 1px solid var(--border-subtle);
    width: fit-content;
  }

  .description {
    box-shadow: 0px -10px 30px 10px rgba(0,0,0,0.1);
    width: 100%;
    padding: 20px;
    background-color: var(--bg-surface);
    backdrop-filter: blur(12px);
    border-radius: 14px;
    border: 1px solid var(--border-subtle);
  }

  .front .img {
    position: absolute;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
    background: var(--bg-surface-deep);
  }

  .circle {
    width: 140px;
    height: 140px;
    border-radius: 50%;
    background-color: ${props => props.gradient || '#6C63FF'};
    position: absolute;
    filter: blur(30px);
    animation: floating 4000ms infinite cubic-bezier(0.4, 0, 0.2, 1);
    opacity: 0.7;
  }

  #bottom {
    background-color: #00E5FF; /* Secondary variant */
    left: 100px;
    top: 90px;
    width: 180px;
    height: 180px;
    animation-delay: -1000ms;
  }

  #right {
    background-color: #FF4D6D; /* Accent variant */
    left: -40px;
    top: -50px;
    width: 160px;
    height: 160px;
    animation-delay: -2000ms;
  }

  @keyframes floating {
    0% { transform: translateY(0px) scale(1); }
    50% { transform: translateY(20px) scale(1.1); }
    100% { transform: translateY(0px) scale(1); }
  }
`;
