"use client";

import { useState } from "react";

const sizes = [
  { size: "XS", chest: '34"', length: '27"', shoulder: '16"' },
  { size: "S",  chest: '36"', length: '28"', shoulder: '17"' },
  { size: "M",  chest: '38"', length: '29"', shoulder: '18"' },
  { size: "L",  chest: '40"', length: '30"', shoulder: '19"' },
  { size: "XL", chest: '42"', length: '31"', shoulder: '20"' },
  { size: "XXL",chest: '44"', length: '32"', shoulder: '21"' },
];

function ShirtCard() {

  const [showBack, setShowBack] = useState(false);
  const [showSizeChart, setShowSizeChart] = useState(false);

  const [count,setCount] = useState(1);

  const [sizeCounts,setSizeCounts] = useState<Record<string,number>>({
    XS:0,
    S:0,
    M:0,
    L:0,
    XL:0,
    XXL:0
  });

  const sizeOptions = ["XS","S","M","L","XL","XXL"];

  const totalSelected = Object.values(sizeCounts).reduce((a,b)=>a+b,0);

  const incrementSize = (size:string)=>{
    if(sizeCounts[size] >= 2) return;
    if(totalSelected >= count) return;

    setSizeCounts({
      ...sizeCounts,
      [size]: sizeCounts[size] + 1
    });
  };

  const decrementSize = (size:string)=>{
    if(sizeCounts[size] === 0) return;

    setSizeCounts({
      ...sizeCounts,
      [size]: sizeCounts[size] - 1
    });
  };

  return (
    <div style={{ fontFamily: "'Bangers', cursive" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bangers&family=Comic+Neue:wght@700&display=swap');
        .shirt-card { width:100% max-height:400px; max-width: 1000px; display: flex; flex-direction: row; border-radius:16px; background:#fff; border:3px solid #000; box-shadow:6px 6px 0 #000; overflow:hidden; }
        .track-wrap { width:50%; overflow:hidden; min-height:400px; background:#000; border-right:3px solid #000; position:relative; display: flex; flex-direction: column; }
        .image-track { display:flex; width:200%; flex: 1; transition:transform 0.45s cubic-bezier(0.77,0,0.18,1); }
        .image-slot { width:50%; height:100%; display:flex; align-items:center; justify-content:center; position:relative; overflow:hidden; }
        .image-slot img { width:100%; height:100%; object-fit:contain; }
        .slide-label { position:absolute; top:10px; left:10px; background:#FFE500; border:2px solid #000; box-shadow:2px 2px 0 #000; font-family:'Bangers',cursive; font-size:14px; letter-spacing:1px; padding:2px 10px; border-radius:20px; z-index:2; }
        .toggle-row { display:flex; gap:8px; justify-content:center; padding:10px 0; background: #000; border-top: 3px solid #000; }
        .toggle-btn { font-family:'Bangers',cursive; letter-spacing:1.5px; font-size:15px; padding:4px 18px; border-radius:20px; border:2.5px solid #000; cursor:pointer; transition:all 0.15s; box-shadow:2px 2px 0 #000; }
        .toggle-btn.active { background:#FFE500; color:#000; }
        .toggle-btn:not(.active) { background:#fff; color:#000; }
        .toggle-btn:hover:not(.active) { background:#FFE500; }
        .info-section { width: 50%; padding:24px 20px; text-align:left; display: flex; flex-direction: column; justify-content: center; }
        .shirt-title { font-family:'Bangers',cursive; font-size:36px; letter-spacing:2px; color:#000; margin:0 0 8px; line-height: 1.1; }
        .shirt-price { font-family:'Comic Neue',cursive; font-size:22px; font-weight:700; color:#e00; margin:0 0 20px; }
        .size-section-title { font-family: 'Bangers', cursive; font-size: 18px; letter-spacing: 1px; margin-bottom: 8px; }
        .size-row { display:flex; gap:8px; justify-content:flex-start; flex-wrap:wrap; margin-bottom:16px; }
        .size-btn { 
          font-family:'Bangers',cursive; 
          font-size:22px; 
          letter-spacing:1px; 
          width:128px; 
          height:128px; 
          border-radius:10px; 
          border:2.5px solid #000; 
          cursor:pointer; 
          background:#fff; 
          box-shadow:3px 3px 0 #000; 
          transition:all 0.12s; 
        }
        .size-btn.selected { background:#FFE500; box-shadow:4px 4px 0 #000; transform:translate(-1px,-1px); }
        .size-btn:hover:not(.selected) { background:#f0f0f0; }
        .size-chart-btn { font-family:'Bangers',cursive; font-size:16px; letter-spacing:1px; background:none; border:none; cursor:pointer; text-decoration:underline wavy #e00; color:#000; margin-bottom:24px; padding:0; text-align: left; }
        .buy-btn { width:100%; font-family:'Bangers',cursive; font-size:26px; letter-spacing:2px; background:#000; color:#FFE500; border:none; padding:12px; border-radius:12px; cursor:pointer; box-shadow:4px 4px 0 #555; transition:all 0.12s; margin-top: auto; }
        .buy-btn:hover { transform:translate(-2px,-2px); box-shadow:6px 6px 0 #555; }
        .count-select { 
  font-family:'Bangers',cursive; 
  font-size:22px; 
  letter-spacing:1px; 
  width:400px; 
  height:48px; 
  border-radius:10px; 
  border:2.5px solid #000; 
  cursor:pointer; 
  background:#fff; 
  box-shadow:3px 3px 0 #000; 
  transition:all 0.12s; 
  margin-bottom:16px; 
  appearance:none; 
  text-align:center; 
  outline:none; 
}

.count-select:focus {
  background:#FFE500;
  box-shadow:4px 4px 0 #000;
  transform:translate(-1px,-1px);
}
        `}</style>

      <div className="shirt-card">

        <div className="track-wrap">
          <div className="image-track" style={{ transform: showBack ? "translateX(-50%)" : "translateX(0%)" }}>
            <div className="image-slot">
              <span className="slide-label" style={{ color: 'black' }}>FRONT</span>
              <img src="front.png" alt="Front" />
            </div>
            <div className="image-slot">
              <span className="slide-label" style={{ color: 'black' }}>BACK</span>
              <img src="back.png" alt="Back" />
            </div>
          </div>

          <div className="toggle-row">
            <button className={`toggle-btn${!showBack ? " active" : ""}`} onClick={() => setShowBack(false)}>FRONT</button>
            <button className={`toggle-btn${showBack ? " active" : ""}`} onClick={() => setShowBack(true)}>BACK</button>
          </div>
        </div>

        <div className="info-section">

          <p className="shirt-title">NF COMIC TEE</p>
          <p className="shirt-price">1 for 260 Rs | 2 for 499 Rs</p>

          <div className="size-section-title" style={{ color: 'black' }}>SELECT COUNT</div>

          <select
            className="count-select"
            style={{ color: 'black' }}
            value={count}
            onChange={(e)=>{
              const c = Number(e.target.value);
              setCount(c);

              setSizeCounts({
                XS:0,S:0,M:0,L:0,XL:0,XXL:0
              });
            }}
          >
            <option value="1">1</option>
            <option value="2">2</option>
          </select>

          <div className="size-section-title" style={{ color: 'black' }}>SELECT SIZE</div>

          <div className="size-row" style={{ color: 'black' }}>
            {sizeOptions.map(s => (

              <div key={s} style={{position:"relative", width:"128px", height:"128px"}}>

                <button
                  className={`size-btn${sizeCounts[s] > 0 ? " selected" : ""}`}
                  style={{width:"100%",height:"100%"}}
                >
                  {s}
                </button>

                <button
                  onClick={()=>incrementSize(s)}
                  style={{
                    position:"absolute",
                    top:6,
                    right:6,
                    width:28,
                    height:28,
                    borderRadius:"50%",
                    border:"2px solid black",
                    background:"#FFE500",
                    fontFamily:"Bangers",
                    cursor:"pointer"
                  }}
                >
                  +
                </button>

                <button
                  onClick={()=>decrementSize(s)}
                  style={{
                    position:"absolute",
                    bottom:6,
                    right:6,
                    width:28,
                    height:28,
                    borderRadius:"50%",
                    border:"2px solid black",
                    background:"#fff",
                    fontFamily:"Bangers",
                    cursor:"pointer"
                  }}
                >
                  -
                </button>

                {sizeCounts[s] > 0 && (
                  <div
                    style={{
                      position:"absolute",
                      top:6,
                      left:6,
                      background:"#000",
                      color:"#FFE500",
                      padding:"2px 6px",
                      borderRadius:6,
                      fontSize:14,
                      fontFamily:"Bangers"
                    }}
                  >
                    {sizeCounts[s]}
                  </div>
                )}

              </div>

            ))}
          </div>

          <button
            className="buy-btn"
            disabled={totalSelected !== count}
          >
            BUY NOW!
          </button>

        </div>
      </div>

    </div>
  );
}

export default function MerchPage() {
  return (
    <div style={{
      minHeight: "100vh",
      backgroundImage: "url('/nfbackground.jpg')",
      backgroundSize: "cover, cover, cover",
      backgroundPosition: "top, center, center",
      backgroundRepeat: "no-repeat, no-repeat, no-repeat",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      padding: "40px 20px",
    }}>

      <div style={{ width: "100%", textAlign:"center", marginBottom:40 }}>
        <div style={{ display:"flex", alignItems:"center", justifyContent:"flex-start", gap:16, marginBottom:8 }}>
          <img src="/logo.png" alt="NF Icon" style={{ width:40, height:40 }} />
          <h1 style={{
            fontFamily:"'Bangers',cursive",
            fontSize:30,
            letterSpacing:6,
            color:"#FFE500",
            textShadow:"4px 4px 0 #000,-2px -2px 0 #000,2px -2px 0 #000",
            lineHeight:1,
            margin:0,
          }}>NITTFEST</h1>
        </div>

        <div style={{
          display:"inline-block",
          background:"#e00",
          color:"#fff",
          fontFamily:"'Bangers',cursive",
          fontSize:22,
          letterSpacing:5,
          padding:"4px 24px",
          border:"3px solid #000",
          boxShadow:"4px 4px 0 #000",
          borderRadius:4,
          transform:"rotate(-1deg)",
        }}>✦ MERCHANDISE ✦</div>
      </div>

      <ShirtCard />
      <div
  style={{
    color:"black",
    width: "100%",
    maxWidth: "1000px",
    background: "#FFF3B0",
    border: "3px solid #000",
    borderRadius: "16px",
    boxShadow: "6px 6px 0 #000",
    padding: "24px",
    marginTop: "30px",
    fontFamily: "'Bangers', cursive"
  }}
>

  <h2
    style={{
      fontSize: "34px",
      letterSpacing: "3px",
      textAlign: "center",
      marginBottom: "10px"
    }}
  >
     SIZE CHART
  </h2>

  <p
    style={{
      textAlign: "center",
      fontFamily: "'Comic Neue', cursive",
      fontSize: "12px",
      color: "#666",
      marginBottom: "16px"
    }}
  >
    ⚡ All measurements in inches · Lay flat & measure ⚡
  </p>

  <table
    style={{
      width: "100%",
      borderCollapse: "collapse",
      fontFamily: "'Comic Neue', cursive",
      fontWeight: 700
    }}
  >
    <thead>
      <tr>
        <th style={{
          background:"#000",
          color:"#FFE500",
          border:"2px solid #000",
          padding:"8px"
        }}>SIZE</th>

        <th style={{
          background:"#000",
          color:"#FFE500",
          border:"2px solid #000",
          padding:"8px"
        }}>CHEST</th>

        <th style={{
          background:"#000",
          color:"#FFE500",
          border:"2px solid #000",
          padding:"8px"
        }}>LENGTH</th>

        <th style={{
          background:"#000",
          color:"#FFE500",
          border:"2px solid #000",
          padding:"8px"
        }}>SHOULDER</th>
      </tr>
    </thead>

    <tbody>
      {sizes.map(row => (
        <tr key={row.size}>
          <td style={{border:"2px solid #000",padding:"8px",textAlign:"center"}}>{row.size}</td>
          <td style={{border:"2px solid #000",padding:"8px",textAlign:"center"}}>{row.chest}</td>
          <td style={{border:"2px solid #000",padding:"8px",textAlign:"center"}}>{row.length}</td>
          <td style={{border:"2px solid #000",padding:"8px",textAlign:"center"}}>{row.shoulder}</td>
        </tr>
      ))}
    </tbody>
  </table>

</div>

    </div>
  );
}