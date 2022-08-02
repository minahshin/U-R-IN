import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../api";

// study
// 스터디 상세 보기
export const getStudy = createAsyncThunk("GET_STUDY", async (studyId) => {
  console.log("스터디 가져오는 중");
  const response = await axiosInstance.get(`studies/${studyId}`);
  return response.data;
});

// 스터디 생성
export const createStudy = createAsyncThunk("CREATE_STUDY", async (form) => {
  const response = await axiosInstance.post(`studies/`, form);
  return response.data;
});

// 스터디 정보 수정
export const updateStudy = createAsyncThunk(
  "UPDATE_STUDY",
  async (studyId, form) => {
    const response = await axiosInstance.put(`studies/${studyId}`, form);
    return response.data;
  }
);

// 스터디 상태 변경
export const changeStudyStatus = createAsyncThunk(
  "CHANGE_STUDY_STATUS",
  async (studyId, status) => {
    const response = await axiosInstance.patch(`studies/${studyId}`, {
      status,
    });
    return response.data;
  }
);

// participants
// 스터디 가입
export const joinStudy = createAsyncThunk("JOIN_STUDY", async (studyId) => {
  const response = await axiosInstance.post(`studies/${studyId}/participants`);
  return response.data;
});

// 스터디 참가자 삭제
// TODO: 스스로 나가는 것과 강퇴 구분 필요, 함수를 나눠야 할 수도 있음
export const leaveStudy = createAsyncThunk(
  "LEAVE_STUDY",
  async (studyId, participantsId) => {
    const response = await axiosInstance.delete(
      `studies/${studyId}/participants/${participantsId}`
    );
    return response.data;
  }
);

const studySlice = createSlice({
  // state에 들어가는 이름
  // 각 컴퍼넌트에서 state.study 이런 식으로 부를 때 사용
  name: "study",
  // 초기 상태, 백으로부터 데이터를 불러오는데 혹시라도 실패한다면 이 데이터가 보이기 때문에
  // 빈 객체 보다는 적당히 형태를 잡아두는게 좋음
  initialState: {
    currentMember: 0,
    dday: 0,
    id: 0,
    memberCapacity: 0,
    notice: "string",
    onair: true,
    participants: [
      {
        id: 0,
        // TODO: leader vs isLeader? Back과 협의 필요, isLeader로 바꾸는게 좋을 듯
        leader: true,
        nickname: "string",
      },
    ],
    status: "COMPLETED",
    title: "string",
  },
  // 비동기 통신이 없는 상황에서 사용
  // 서버에 요청 없이 study의 상태를 바꿀 일이 없기 때문에 딱히 쓸 일이 없음
  reducers: {},

  // [함수명.함수상태]: (state, { payload }) => {상태를 변경 or 함수가 실행된 다음 하고 싶은 행동}

  // 함수상태: pending, fulfilled, rejected 등이 있음, rejected는 요청에 실패한 경우 => 에러 처리에 사용
  // state: study를 의미하지만 study가 아닌 state로 적어야 하는 점 주의
  // payload: 보통 함수의 return 문 안에 있는 요청으로 받아온 response.data
  //          API명세에서 응답을 어떻게 보내주는지 확인

  // [getStudy.fulfilled]: (state, { payload }) => payload,
  // getStudy가 완료되면 현재 상태인 state를 payload(getStudy가 받아온 response.data)로 대체시키겠다.
  extraReducers: {
    [getStudy.fulfilled]: (state, { payload }) => payload,
    [createStudy.fulfilled]: (state, { payload }) => {
      // 스터디 생성 성공 => 생성된 스터디 방으로 이동해야 함
    },
    // TODO
    // [updateStudy.fulfilled]:
    // [changeStudyStatus.fulfilled]:
    // [joinStudy.fulfilled]:
    // [leaveStudy.fulfilled]:
  },
});

export default studySlice.reducer;
