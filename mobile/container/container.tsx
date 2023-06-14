import axios from "axios";
import { useState } from "react";
import { createContainer } from "unstated-next";
import { useNavigation } from "@react-navigation/native";
import { API_URL } from "../constants";

export const ApiCalls = () => {
  const [selectedGuest, setSelectedGuest] = useState({
    guests: 0,
    id: 0,
    mealOptionId: null,
    name: "",
    phoneNumber: "",
    rsvp: null,
    weddingId: 0,
    address: "",
  });
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phone: "",
    id: "",
  });

  const [wedding, setWedding] = useState({
    date: "",
    time: "",
    address: "",
    mealResponses: "",
    userId: "",
    rsvps: "",
    trial: "",
    status: "",
    id: "",
  });

  const [guest, setGuest] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    rsvps: false,
    guests: 0,
    weddingId: "",
    mealOptionId: "",
    address: "",
  });

  const [meals, setMeals] = useState([]);
  const [guests, setGuests] = useState([]);
  const [groups, setGroups] = useState([]);
  const [groupGuests, setGroupGuests] = useState([]);
  const [token, setToken] = useState("");
  const [loginError, setLoginError] = useState(false);
  const [emailExist, setEmailExist] = useState(false);

  const [groupGuest, setGroupGuest] = useState([{ guestId: "", groupId: "" }]);

  const [messageGroup, setMessageGroup] = useState([
    {
      name: "",
      date: new Date(),
      time: "",
      message: "",
      groupId: "",
      weddingId: "",
      scheduled: "",
      sent: false,
    },
  ]);
  const [message, setMessage] = useState("");
  const [userMessage, setUserMessage] = useState({
    name: "",
    date: "",
    time: "",
    message: "",
    groupId: 0,
  });
  const [groupMessages, setGroupMessages] = useState([]);
  const [status, setStatus] = useState("");
  const navigation = useNavigation();

  // Wedding
  const createWedding = ({ userId }) => {
    axios
      .post(API_URL + "/wedding", {
        userId,
      })
      .then((response) => {
        navigation.navigate("onboarding", {});
        setStatus("success");
        setMessage(response.statusText);
      })
      .catch((error) => {
        setStatus("error");
      });
  };

  const getWedding = (id, phone) => {
    axios.get(API_URL + "/wedding/weddingByUser/" + id).then((response) => {
      setWedding({
        ...wedding,
        date: response.data.date,
        time: response.data.time,
        address: response.data.address,
        mealResponses: response.data.mealResponses,
        userId: response.data.userId,
        rsvps: response.data.rsvps,
        trial: response.data.trial,
        status: response.data.status,
        id: response.data.id,
      });
      if (phone.length > 0) {
        navigation.navigate("addContacts", {});
      } else {
        navigation.navigate("addContacts", {});
      }
    });
  };

  const updateWeddingAddress = ({ address, callback = null }) => {
    axios
      .patch(API_URL + "/wedding/" + wedding.id, {
        address,
      })
      .then((response) => {
        setWedding({
          ...wedding,
          address,
        });
        if (callback) {
          callback();
        } else {
          navigation.navigate("weddingDate", {});
        }
      })
      .catch((error) => {
        setStatus("error");
      });
  };

  const updateWeddingDateTime = ({
    date,
    time,
    settings = false,
    callback = null,
  }) => {
    axios
      .patch(API_URL + "/wedding/" + wedding.id, {
        date,
        time,
      })
      .then((response) => {
        setWedding({
          ...wedding,
          date,
          time,
        });
        if (!settings) {
          navigation.navigate("attending", {});
        } else {
          callback();
        }
      })
      .catch((error) => {
        setStatus("error");
      });
  };

  const updateWeddingRsvp = ({ rsvps }) => {
    axios
      .patch(API_URL + "/wedding/" + wedding.id, {
        rsvps,
      })
      .then((response) => {
        setWedding({
          ...wedding,
          rsvps,
        });
        navigation.navigate("mealResponses", {});
      })
      .catch((error) => {
        setStatus("error");
      });
  };

  const updateWeddingMealResponses = ({ mealResponses }) => {
    axios
      .patch(API_URL + "/wedding/" + wedding.id, {
        mealResponses,
      })
      .then((response) => {
        setWedding({
          ...wedding,
          mealResponses,
        });
        if (mealResponses) {
          navigation.navigate("guestMeals", {});
        } else {
          navigation.navigate("specialGroup", {});
        }
      })
      .catch((error) => {
        setStatus("error");
      });
  };

  // User
  const registerUser = () => {
    axios
      .post(API_URL + "/authentication/register", {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email.toLowerCase(),
        password: user.password,
        phone: "",
      })
      .then((response) => {
        // setStatus("success");
        createWedding({ userId: response.data.id });
        // setMessage(response.statusText);
      })
      .catch((error) => {
        setStatus("error");
      });
  };

  const editUser = () => {
    axios
      .patch(API_URL + "/users/" + user.id, {
        phone: user.phone,
      })
      .then((response) => {
        setStatus("success");
        setMessage(response.statusText);
        navigation.navigate("location", {});
      })
      .catch((error) => {
        setStatus("error");
      });
  };

  const editUserEmail = ({ email, callback }) => {
    axios
      .patch(API_URL + "/users/" + user.id, {
        email,
      })
      .then((response) => {
        setUser({ ...user, email });
        if (callback) {
          callback();
        }
      })
      .catch((error) => {
        setStatus("error");
      });
  };

  const editUserPhone = ({ phone, callback }) => {
    axios
      .patch(API_URL + "/users/" + user.id, {
        phone,
      })
      .then((response) => {
        setUser({ ...user, phone });
        if (callback) {
          callback();
        }
      })
      .catch((error) => {
        setStatus("error");
      });
  };

  const getUser = () => {
    axios.get(API_URL + "/users/22").then((response) => {
      setUser({
        ...user,
        firstName: response.data.firstName,
        lastName: response.data.lastName,
        email: response.data.email,
        password: response.data.password,
        phone: response.data.phone,
      });
    });
  };

  const getUsersByEmail = (email) => {
    return axios.post(API_URL + "/users/getUserByEmail", {
      email: email.toLowerCase(),
    });
  };

  const login = ({ email, password }) => {
    axios
      .post(API_URL + "/authentication/log-in", {
        email,
        password,
      })
      .then((response) => {
        const newToken = response.data.token
          .replace("; HttpOnly; Path=/; Max-Age=3600", "")
          .replace("Authentication=", "");
        const newUser = response.data.user;
        setToken(newToken);
        setUser({
          ...user,
          firstName: newUser.firstName,
          lastName: newUser.lastName,
          phone: newUser.phone,
          email: newUser.email,
          id: newUser.id,
        });

        getWedding(newUser.id, newUser.phone);
      })
      .catch((error) => {
        setLoginError(true);
      });
  };

  // Guest
  const getGuestByWeddingId = () => {
    axios.get(API_URL + "/guest/byWeddingId/" + wedding.id).then((response) => {
      const filteredGuests = response.data.filter((item) => item.name);
      setGuests(filteredGuests);
    });
  };

  const createGuestBatch = async (batch, screen = "", callback = null) => {
    const guestsSanitized = batch
      .filter((item) => {
        if (!item.phoneNumbers) return false;
        const phoneNumber = item.phoneNumbers[0];
        if (!phoneNumber || !phoneNumber.digits) return false;
        if (!item.name) return false;
        return true;
      })
      .map((item) => {
        return {
          name: item.name,
          phoneNumber: item.phoneNumbers[0].digits,
          weddingId: wedding.id,
        };
      });

    const promises = guestsSanitized.map((singleGuest) => {
      return axios.post(API_URL + "/guest", {
        ...singleGuest,
      });
    });

    try {
      const result = await Promise.all(promises);
      getGuestByWeddingId();
      if (screen) {
        navigation.navigate(screen, {});
      }
      if (callback) {
        callback();
      }
    } catch (err) {
      console.log("error", err);
    }
  };

  const createGuest = (singleGuest) => {
    axios
      .post(API_URL + "/guest", {
        ...singleGuest,
        weddingId: wedding.id,
      })
      .then((response) => {
        getGuestByWeddingId();
        navigation.navigate("index", {});
      })
      .catch((error) => {
        console.log(error.response);
      });
  };

  const editGuestPhone = ({ phoneNumber, callback }) => {
    axios
      .patch(API_URL + "/guest/" + selectedGuest.id, {
        phoneNumber,
      })
      .then((response) => {
        setSelectedGuest({ ...selectedGuest, phoneNumber });
        if (callback) {
          callback();
        }
      })
      .catch((error) => {
        console.log(error.response);
        setStatus("error");
      });
  };

  const editNumberOfGuests = ({ guests, callback }) => {
    axios
      .patch(API_URL + "/guest/" + selectedGuest.id, {
        guests,
      })
      .then((response) => {
        if (callback) {
          getGuestByWeddingId();
          setSelectedGuest({ ...selectedGuest, guests: guests });
          callback();
        }
      })
      .catch((error) => {
        console.log(error.response);
        setStatus("error");
      });
  };

  const editGuestAddress = ({ address, callback }) => {
    axios
      .patch(API_URL + "/guest/" + selectedGuest.id, {
        address,
      })
      .then((response) => {
        setSelectedGuest({ ...selectedGuest, address });
        if (callback) {
          callback();
        }
      })
      .catch((error) => {
        console.log(error.response);
        setStatus("error");
      });
  };

  // Meal Responses
  const createMealResponsesBatch = async (batch) => {
    const promises = batch.map((singleMeal) => {
      return axios.post(API_URL + "/mealOption", {
        ...singleMeal,
        weddingId: wedding.id,
      });
    });

    try {
      const result = await Promise.all(promises);
      navigation.navigate("specialGroup", {});
    } catch (err) {
      console.log("error", err);
    }
  };

  const getMealsByWeddingId = () => {
    axios
      .get(API_URL + "/mealOption/findByWeddingId/" + wedding.id)
      .then((response) => {
        setMeals(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // Group Guest
  const getGroupGuest = () => {
    axios
      .get(API_URL + "/groupGuest/weddingId/" + wedding.id)
      .then((response) => {
        setGroupGuest(response.data);
        getGroupByWeddingId();
      });
  };

  const createGroupGuestBatch = async (
    batch,
    groupId,
    screen = "",
    callback = null
  ) => {
    const promises = batch.map((item) => {
      return axios.post(API_URL + "/groupGuest", {
        groupId,
        guestId: item,
        weddingId: wedding.id,
      });
    });
    try {
      const responses = await Promise.all(promises);
      getGroupByWeddingId();
      getGroupGuest();
      if (screen) {
        navigation.navigate(screen, {});
      }
      if (callback) {
        callback();
      }
    } catch (err) {
      console.log("error", err);
    }
  };

  const findAllByGroup = (groupId) => {
    axios.get(API_URL + `/groupGuest/group/${groupId}`).then((response) => {
      console.log("Groups", response.data);
    });
  };

  const findAllByGroups = (groupsId) => {
    const promises = [];
    groupsId.forEach((group) => {
      const promise = axios.get(API_URL + `/groupGuest/group/${group}`);
      promises.push(promise);
    });
    Promise.all(promises).then((response) => {
      let newGroupGuests = [];
      response.forEach((item) => {
        newGroupGuests = [...newGroupGuests, ...item.data];
      });
      setGroupGuests(newGroupGuests);
    });
  };

  // Group
  const getGroupByWeddingId = () => {
    axios.get(API_URL + "/group/byWeddingId/" + wedding.id).then((response) => {
      setGroups(response.data);
    });
  };

  const createGroup = ({
    groupName,
    groupGuests,
    screen = "",
    callback = null,
  }) => {
    console.log("olar", groupName, groupGuests, screen);
    axios
      .post(API_URL + "/group", {
        groupName,
        weddingId: wedding.id,
      })
      .then((response) => {
        if (groupGuests.length > 0) {
          createGroupGuestBatch(
            groupGuests,
            response.data.id,
            screen,
            callback
          );
        } else {
          getGroupByWeddingId();
          getGroupGuest();
          if (screen) {
            navigation.navigate(screen, {});
          }
          if (callback) {
            callback();
          }
        }
      })
      .catch((error) => {
        console.log("Error", error);
      });
  };

  const editGroup = ({ groupId, groupName, added, deleted }) => {
    axios
      .patch(API_URL + "/group/" + groupId, {
        groupName,
      })
      .then((response) => {
        console.log(response.data);
        if (added.length > 0 || deleted.length > 0) {
          addDeleteGuestGroupBatch(added, deleted, groupId);
        }
        getGroupByWeddingId();
        getGroupGuest();
      })
      .catch((error) => {
        console.log("Error", error);
      });
  };

  const addDeleteGuestGroupBatch = (added, deleted, groupId) => {
    const promises = [];
    if (added.length > 0) {
      added.forEach((guestId) => {
        const promise = axios.post(API_URL + `/groupGuest`, {
          groupId,
          guestId,
          weddingId: wedding.id,
        });
        promises.push(promise);
      });
    }
    if (deleted.length) {
      deleted.forEach((groupGuestId) => {
        const promise = axios.delete(API_URL + `/groupGuest/${groupGuestId}`);
        promises.push(promise);
      });
    }
    Promise.all(promises)
      .then((response) => {
        getGroupGuest();
      })
      .catch((error) => {
        console.log("Error", error);
      });
  };

  // Message Group
  const getMessageGroup = () => {
    axios
      .get(API_URL + `/message-group/byWeddingId/${wedding.id}`)
      .then((response) => {
        console.log(response.data);
        setMessageGroup(response.data);
      });
  };

  // Message
  const createMessage = (newMessage) => {
    axios
      .post(API_URL + "/message-group", {
        ...newMessage,
        weddingId: wedding.id,
      })
      .then((response) => {
        console.log(response);
        sendMessage(newMessage);
        navigation.navigate("index", {});
        getMessageGroup();
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const sendMessage = (message) => {
    const guestsToSend = [];
    groupGuests.forEach((item) => {
      if (item.groupId === message.groupId) {
        const guestToSend = guests.find(
          (guestItem) => guestItem.id === item.guestId
        );
        if (guestToSend) {
          const sanityzePhone = (phoneReceived) => {
            if (phoneReceived.indexOf("+1") !== -1) {
              return phoneReceived;
            }
            if (phoneReceived.indexOf("+55") !== -1) {
              return phoneReceived;
            }
            if (phoneReceived.indexOf("+") !== -1) {
              return null;
            }
            return "+1" + phoneReceived;
          };
          const sanityzedPhone = sanityzePhone(guestToSend.phoneNumber);
          if (sanityzedPhone) {
            const newGuestToSend = {
              name: guestToSend.name,
              phone: sanityzedPhone,
            };
            guestsToSend.push(newGuestToSend);
          }
        }
      }
    });
    if (guestsToSend.length > 0) {
      const promises = [];
      // This is commented because of Twilio account key
      // guestsToSend.forEach((receiver) => {
      //   let config = {
      //     method: "post",
      //     maxBodyLength: Infinity,
      //     url: "https://api.twilio.com/2010-04-01/Accounts/account/Messages.json",
      //     headers: {
      //       "Content-Type": "application/x-www-form-urlencoded",
      //       Authorization:
      //         "Basic key_here",
      //     },
      //     data: {
      //       Body: message.message,
      //       From: "From_phone_here",
      //       To: receiver.phone,
      //     },
      //   };

      //   promises.push(axios.request(config));
      // });
      Promise.all(promises)
        .then((response) => {
          console.log("Success sending sms", response);
        })
        .catch((error) => {
          console.log("error sending sms", error);
        });
    }
  };

  const getMessageByGroupId = ({ groupId }) => {
    axios
      .get(API_URL + `/message-group/byGroupId/${groupId}`)
      .then((response) => {
        setGroupMessages(response.data);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  return {
    user,
    setUser,
    message,
    status,
    registerUser,
    editUser,
    wedding,
    setWedding,
    createWedding,
    getUser,
    getGuestByWeddingId,
    guests,
    guest,
    getGroupGuest,
    createGroup,
    groupGuest,
    getMessageGroup,
    messageGroup,
    getWedding,
    getGroupByWeddingId,
    login,
    updateWeddingAddress,
    createGuestBatch,
    updateWeddingRsvp,
    updateWeddingMealResponses,
    createMealResponsesBatch,
    groups,
    updateWeddingDateTime,
    loginError,
    editUserEmail,
    editUserPhone,
    selectedGuest,
    setSelectedGuest,
    editGuestPhone,
    createGuest,
    getUsersByEmail,
    findAllByGroup,
    findAllByGroups,
    groupGuests,
    editGroup,
    createMessage,
    setUserMessage,
    userMessage,
    getMessageByGroupId,
    groupMessages,
    editNumberOfGuests,
    editGuestAddress,
    getMealsByWeddingId,
    meals,
    emailExist,
  };
};

export const ApiContainer = createContainer(ApiCalls);
