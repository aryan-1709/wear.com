import React, {createContext, useState} from "react";

const UserContext = createContext(null);

const User = ({children}) => {
    const [userInfo, setuserInfo] = useState();

    return(
        <UserContext.Provider value={{userInfo, setuserInfo}}>
            {children}
        </UserContext.Provider>
    );
};

export {UserContext, User};
