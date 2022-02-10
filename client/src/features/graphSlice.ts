import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../app/store';
import { GraphsType } from '../types/GraphsType';

const initialState: GraphsType = {
  graphNo: []
}

export const graphSlice = createSlice({
  name: 'graphs',
  initialState,
  reducers: {
    graph_add: (state, action) => {
      state.graphNo.push(action.payload)
    },
    graph_delete: (state, action) => {
      state.graphNo = state.graphNo.filter(graphNo => graphNo !== action.payload)
    },
  },
});

export const { graph_add, graph_delete } = graphSlice.actions;

export const selectGraphs = (state: RootState) => state.graphs.graphNo;

export default graphSlice.reducer;