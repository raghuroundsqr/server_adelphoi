import axios from 'axios'
import { fetchUsersFailure } from '../redux/login/loginAction'
import { fetchUsersRequest } from '../redux/login/loginAction'
import { fetchUsersSuccess } from '../redux/login/loginAction'
import { fetchQuestionsFailure } from '../redux/FetchQuestions/QuestionsAction'
import { fetchQuestionsRequest } from '../redux/FetchQuestions/QuestionsAction'
import { fetchQuestionsSuccess } from '../redux/FetchQuestions/QuestionsAction'
import { addQuestionsFailure } from '../redux/AddQuestions/AddQuestionsAction'
import { addQuestionsRequest } from '../redux/AddQuestions/AddQuestionsAction'
import { addQuestionsSuccess } from '../redux/AddQuestions/AddQuestionsAction'
import { eifQuestionsFailure } from '../redux/EifQuestions/EifQuestionsAction'
import { eifQuestionsRequest } from '../redux/EifQuestions/EifQuestionsAction'
import { eifQuestionsSuccess } from '../redux/EifQuestions/EifQuestionsAction'
import { rafQuestionsFailure } from '../redux/RafQuestions/RafQuestionsAction'
import { rafQuestionsRequest } from '../redux/RafQuestions/RafQuestionsAction'
import { rafQuestionsSuccess } from '../redux/RafQuestions/RafQuestionsAction'
import { addQuestionsCategoryFailure, addQuestionsCategoryRequest, addQuestionsCategorySuccess }
 from '../redux/AddQuestionsCategory/AddQuestionsCategoryAction';
 import { fetchQuestionscategoryFailure,
           fetchQuestionscategoryRequest,
          fetchQuestionscategorySuccess } 
   from '../redux/FetchQuestionsCategory/QuestionsCategoryAction'
import { addEifFailure,addEifRequest,addEifSuccess} 
            from '../redux/AddEIF/AddEIFAction'
import { addRafFailure,addRafRequest,addRafSuccess} 
            from '../redux/AddRAF/AddRAFAction'
import { fetchEifListFailure,fetchEifListRequest,fetchEifListSuccess} 
            from '../redux/FetchEIFList/EIFListAction'
import { fetchRafListFailure,fetchRafListRequest,fetchRafListSuccess} 
            from '../redux/FetchRAFList/RAFListAction'
import createAuthRefreshInterceptor from "axios-auth-refresh"
import { update } from '../redux/login/loginAction' 
import { clearUser } from '../redux/login/loginAction' 
import  {store}  from '../App'
export const baseApiUrl = "http://3.6.90.1:8005"; 
//export const baseApiUrl = "https://0f1e2164.ngrok.io"; 
const refreshAuthLogic = async failedRequest => {
  console.log('refreshed')
  //  const { store } = store
    const userState = store.getState().user;
    const currentUser = userState.user;
    if(!userState) {
       return Promise.reject();
    }
    const tokenRefreshResponse = await axios.post('http://52.64.1.72/login/refresh/', {
    refresh: currentUser.refreshToken
  })
  localStorage.setItem('refreshtoken', tokenRefreshResponse.data.token)
  const accessToken = tokenRefreshResponse.data.access_token
  
  store.dispatch(update({
    user: {
      ...currentUser,
      accessToken
    }
  }))
  failedRequest.response.config.headers['Authorization'] = 'Bearer ' + tokenRefreshResponse.data.token
  return Promise.resolve()

}

createAuthRefreshInterceptor(axios , refreshAuthLogic);

export const login = async (email, password) => {
  console.log(store)
  const { dispatch } = store
    try {
      dispatch(fetchUsersRequest)
      const response = await axios.post(`${baseApiUrl}/admin/login`, { username: email, password: password });
      console.log(response.data,'12')
      const { token , role_type } = response.data.response
      console.log(token,'13')
      console.log(role_type,'14')
      const user ={ 
          email,
          password,
          accessToken : token,
          role_type: role_type
      }
      dispatch(fetchUsersSuccess(user))
      localStorage.setItem("refreshToken", response.data.token);
      return response;
    } catch (error) {
        console.log('error')
     dispatch(fetchUsersFailure(error.message))
        throwError(error)
    }
  };
  export const fetchQuestions = async() => {
    console.log('store')
    const { dispatch } = store
    // const currentUser = store.getState().user;
    // console.log('current user',currentUser)
      try {
        dispatch(fetchQuestionsRequest)
        await axios.get(`${baseApiUrl}/questions/`)
        .then(response => {
          const questionsList = response.data
          console.log(questionsList,'ques')
          dispatch(fetchQuestionsSuccess(questionsList))
          return response.data;
        })
          }
      
       catch (error) {
          console.log('error')
          dispatch(fetchQuestionsFailure(error.message))
          throwError(error)
          
      }
    };

    export const fetchEiflist = async() => {
      console.log('store')
      const { dispatch } = store
     const currentUser = store.getState().loginData.user.accessToken;
        try {
          dispatch(fetchEifListRequest)
          await axios.get(`${baseApiUrl}/staging?category=1`,{
            headers : {
              'Authorization' : `Bearer ${currentUser}`
            }     
          })
          .then(response => {
            const EifList = response.data
            console.log(EifList,'ques')
            dispatch(fetchEifListSuccess(EifList))
            return response.data;
          })
            }
        
         catch (error) {
            console.log('error')
            dispatch(fetchEifListFailure(error.message))
            throwError(error)
            
        }
      };

      export const fetchRaflist = async() => {
        console.log('store')
        const { dispatch } = store
       const currentUser = store.getState().loginData.user.accessToken;
          try {
            dispatch(fetchRafListRequest)
            await axios.get(`${baseApiUrl}/staging?category=2`,{
              headers : {
                'Authorization' : `Bearer ${currentUser}`
              }     
            })
            .then(response => {
              const RafList = response.data
              console.log(RafList,'ques')
              dispatch(fetchRafListSuccess(RafList))
              return response.data;
            })
              }
          
           catch (error) {
              console.log('error')
              dispatch(fetchEifListFailure(error.message))
              throwError(error)
              
          }
        };

    export const fetchQuestionsCategory = async() => {
      console.log('store')
      const { dispatch } = store
      try {
          dispatch(fetchQuestionscategoryRequest)
          const response =await axios.get(`${baseApiUrl}/questionscategory/`)
          .then(response => {
            const questionscategoryList = response.data
            console.log(questionscategoryList,'ques')
            dispatch(fetchQuestionscategorySuccess(questionscategoryList))
            return response.data;
          })
            }
        
         catch (error) {
            console.log('error')
            dispatch(fetchQuestionscategoryFailure(error.message))
            throwError(error)
            
        }
      };

    export const AddQuestions = async(data) => { 
      console.log(store,'store')
      const { dispatch } = store
    const currentUser = store.getState().loginData.user.accessToken;
    console.log(currentUser,'store1')
       try {
          dispatch(addQuestionsRequest)
          const response = await axios.post(`${baseApiUrl}/questions/`,data,{
            headers : {
              'Authorization' : `Bearer ${currentUser}`
            }            
                    })
          .then(response => {
            const addedquestions = response.data
            console.log(addedquestions,'ques')
            dispatch(addQuestionsSuccess(addedquestions))
            return response.data;
          })
            }
        
         catch (error) {
            console.log('error')
            dispatch(addQuestionsFailure(error.message))
            throwError(error)
            
        }
      };
      
      export const submitEIF = async(data) => { 
        console.log(store,'store')
        const { dispatch } = store
      const currentUser = store.getState().loginData.user.accessToken;
      console.log(currentUser,'store1')
         try {
            dispatch(addEifRequest)
            await axios.post(`${baseApiUrl}/staging`,{category: 1,
            answers: data},{
              headers : {
                'Authorization' : `Bearer ${currentUser}`
              }            
                      })
            .then(response => {
              const addeif = response.data
              console.log(addeif,'ques')
              dispatch(addEifSuccess(addeif))
              return response.data;
            })
              }
          
           catch (error) {
              console.log('error')
              dispatch(addEifFailure(error.message))
              throwError(error)
              
          }
        };
       
        export const submitRAF = async(data,customer) => { 
          console.log(store,'store')
          const { dispatch } = store
        const currentUser = store.getState().loginData.user.accessToken;
        console.log(customer,'store1')
           try {
              dispatch(addRafRequest)
              await axios.post(`${baseApiUrl}/staging`,{category: 2,customer: customer,
              answers: data},{
                headers : {
                  'Authorization' : `Bearer ${currentUser}`
                }            
                        })
              .then(response => {
                const addraf = response.data
                console.log(addraf,'ques')
                dispatch(addRafSuccess(addraf))
                return response.data;
              })
                }
            
             catch (error) {
                console.log('error')
                dispatch(addRafFailure(error.message))
                throwError(error)
                
            }
          };

      export const eifQuestions = async () => {
        console.log('store')
        const { dispatch } = store
        console.log('loadquestionsXXXXXX')
        try {
          dispatch(eifQuestionsRequest)
          const response = await axios.get(`${baseApiUrl}/stages?category=1`) 
            .then(response => {
              const loadquestions = response.data
              console.log(loadquestions, 'loadquestionsXXXXXX') 
              dispatch(eifQuestionsSuccess(loadquestions))
              return response.data;
            })
        }
        catch (error) {
          console.log('error')
          dispatch(eifQuestionsFailure(error.message))
          throwError(error)
      
        }
      };

      export const rafQuestions = async () => {
        console.log('store')
        const { dispatch } = store
        console.log('loadquestionsXXXXXX')
        try {
          dispatch(rafQuestionsRequest)
          await axios.get(`${baseApiUrl}/stages?category=2`) 
            .then(response => {
              const loadrafquestions = response.data
              console.log(loadrafquestions, 'loadquestionsXXXXXX') 
              dispatch(rafQuestionsSuccess(loadrafquestions))
              return response.data;
            })
        }
        catch (error) {
          console.log('error')
          dispatch(rafQuestionsFailure(error.message))
          throwError(error)
      
        }
      };

      export const AddQuestionsCategory = async(data) => { 
        console.log(store,'store')
        const { dispatch } = store
      const currentUser = store.getState().loginData.user.accessToken;
      console.log(currentUser,'store1')
         try {
            dispatch(addQuestionsCategoryRequest)
            const response = await axios.post(`${baseApiUrl}/questionscategory/`,data,{
              headers : {
                'Authorization' : `Bearer ${currentUser}`
              }            
                      })
            .then(response => {
              const addquestionscategory = response.data
              console.log(addquestionscategory,'quess')
              dispatch(addQuestionsCategorySuccess(addquestionscategory))
              return response.data;
            })
              }
          
           catch (error) {
              console.log('error')
              dispatch(addQuestionsCategoryFailure(error.message))
              throwError(error)
              
          }
        };
  
export const logOut = () => {
  const { dispatch } = store
      const currentUser = store.getState().loginData.user.accessToken;
  axios.post(`${baseApiUrl}/admin/logout`,{
    headers : {
      'Authorization' : `Bearer ${currentUser}`
    }            
            })
  .then(response => {
    dispatch(clearUser())
    return response.data;
  })
    
  };

  export const register = async (data) => {
        const { dispatch } = store
        console.log('entered');
        console.log(data);
          try {
          await axios.post("http://52.64.1.72/signup/", 
            { 
              siteid: data.siteid,
              pass_word : data.pass_word,
              firstname  : data.firstname,
              last_name: data.last_name,
              mobile : data.mobile,
              email : data.email
            });
            console.log('success registration')
          } catch (error) {
           console.log('error')
           dispatch(fetchUsersFailure(error.message))
              throwError(error)
          }
        };


  
function throwError(error) {
    if (error.response) {
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
      const errorResponse = {
        data: error.response.data || undefined,
        status: error.response.status || undefined
      };
      throw errorResponse;
    } else if (error.request) {
      console.log(error.request);
      const errorResponse = {
        data: { Error: "unknown error occurred while contacting the server" },
        status: undefined
      };
      throw errorResponse;
    } else {
      console.log("Error", error.message);
    }
  }

  export default createAuthRefreshInterceptor