import React, { useEffect } from 'react'
import axios from 'axios'
import CnGraph from '../components/CnGraph'
import socketIOClient from "socket.io-client";
import { useAppSelector, useAppDispatch } from '../hooks/useRTK';
import { graph_add, selectGraphs } from '../features/graphSlice';

const ENDPOINT = "http://hiro/FullWEBAdminWEB/LoginInfo.aspx"

const Main = () => {
  const graphs = useAppSelector(selectGraphs);
  const dispatch = useAppDispatch();
  useEffect(() => {
    // console.log("🚀 ~ file: Main.tsx ~ line 14 ~ useEffect ~ Websocket 通信開始")
    // const socket = socketIOClient(ENDPOINT);
    // console.log("🚀 ~ file: Main.tsx ~ line 17 ~ useEffect ~ socket", socket)
    // socket.on("FromAPI", (data: any) => {
    //   console.log("🚀 ~ file: Main.tsx ~ line 17 ~ useEffect ~ data", data)
    // });
  }, []);


  const fetchData = async () => {
    // const res = await fetch("http://localhost/FullWEBAdminWEB/LoginInfo.aspx")
    // console.log("🚀 ~ file: Main.tsx ~ line 16 ~ fetchData ~ res", res)
    const res = await axios.get("http://localhost/FullWEBAdminWEB/LoginInfo.aspx")
    console.log("🚀 ~ file: Main.tsx ~ line 16 ~ fetchData ~ res", res)
  }

  const renderGraph = graphs.map((graphNo, index) => {
    return (
      <div key={index}>
        <CnGraph graph={graphNo} />
      </div>
    )
  });

  const addGraph = () => {
    dispatch(graph_add(graphs.length + 1))
  }
  return (
    <div>
      <button
        onClick={addGraph}
      >パネル追加</button>
      {renderGraph}
    </div>
  )
}

export default Main
