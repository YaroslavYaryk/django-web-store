export const READ_USER_INFO = "READ_USER_INFO";
export const CHANGE_USER_INFO = "CHANGE_USER_INFO";

export const fetchUserInfo = (userId) => {
   try {
      return async (dispatch, getState) => {
         dispatch({
            type: READ_USER_INFO,
            email: "duhanov2003@gmail.com",
            firstName: "yaroslav",
            id: userId,
            lastName: "Диханов ",
            livingPlace: "Володимирець",
            middleName: "Юрійович ",
            phone: "38073737383",
            username: "yaryk31",
         });
      };
   } catch (err) {
      throw err;
   }
};

export const changeUserInfo = (
   userId,
   firstName,
   lastName,
   middleName,
   phone,
   livingPlace
) => {
   try {
      return async (dispatch, getState) => {
         dispatch({
            type: CHANGE_USER_INFO,
            firstName: firstName,
            lastName: lastName,
            middleName: middleName,
            livingPlace: livingPlace,
            phone: phone,
         });
      };
   } catch (err) {
      throw err;
   }
};
