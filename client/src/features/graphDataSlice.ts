import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../app/store';
import { DataType } from '../types/DataType';

type InitialStateType = {
  graphData: DataType
}

type RequestType = {
  x: string,
  y: number
}

const initialState: InitialStateType = {
  graphData: { x: [], y: [] }
};

export const graphDataSlice = createSlice({
  name: 'graphData',
  initialState,
  reducers: {
    addGraphData: (state, action: PayloadAction<RequestType>) => {
      // if (state.graphData.x.length >= 10) {
      //   state.graphData.x.shift()
      //   state.graphData.y.shift()
      // }
      state.graphData.x.push(action.payload.x)
      state.graphData.y.push(action.payload.y)
    }
  },
});

export const { addGraphData } = graphDataSlice.actions;

export const selectGraphData = (state: RootState) => state.data;

export default graphDataSlice.reducer;