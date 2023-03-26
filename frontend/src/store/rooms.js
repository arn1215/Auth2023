
export const JOIN_ROOM = 'JOIN_ROOM';
export const LEAVE_ROOM = 'LEAVE_ROOM';
export const CREATE_ROOM = 'CREATE_ROOM';

export const joinRoom = (roomId, user) => ({
  type: JOIN_ROOM,
  payload: { roomId, user }
});

export const leaveRoom = (leftRoomId, userId) => ({
  type: LEAVE_ROOM,
  payload: { leftRoomId, userId }
});

export const createRoom = (newId) => ({
  type: CREATE_ROOM,
  payload: { newId }
});

const initialState = {
  rooms: {},
  availableRooms: []
};

const roomsReducer = (state = initialState, action) => {
  switch (action.type) {
    case JOIN_ROOM:
      const { roomId, user } = action.payload;
      const room = state.rooms[roomId];
      const updatedRoom = {
        ...room,
        participants: [...room.participants, user],
      };
      const updatedRooms = { ...state.rooms, [roomId]: updatedRoom };
      const updatedAvailableRooms = state.availableRooms.filter(id => id !== roomId);
      return { ...state, rooms: updatedRooms, availableRooms: [...state.availableRooms, updatedAvailableRooms] };

    case LEAVE_ROOM:
      const { leftRoomId, userId } = action.payload; // Renamed roomId to leftRoomId
      const leftRoom = state.rooms[leftRoomId]; // Using leftRoomId here
      const remainingParticipants = leftRoom.participants.filter(p => p.id !== userId);
      const updatedLeftRoom = {
        ...leftRoom,
        participants: remainingParticipants,
      };
      const updatedLeftRooms = { ...state.rooms, [leftRoomId]: updatedLeftRoom }; // Using leftRoomId here
      const updatedLeftAvailableRooms = remainingParticipants.length < 2 ? [...state.availableRooms, leftRoomId] : state.availableRooms; // Using leftRoomId here
      return { ...state, rooms: updatedLeftRooms, availableRooms: updatedLeftAvailableRooms };

    case CREATE_ROOM:
      const { newId } = action.payload;
      const newRoom = {
        participants: [],
      };
      const updatedNewRooms = { ...state.rooms, [newId]: newRoom };
      const updatedNewAvailableRooms = [...state.availableRooms, newId];
      return { ...state, rooms: updatedNewRooms, availableRooms: updatedNewAvailableRooms };

    default:
      return state;
  }
};

export default roomsReducer;