import { useActionData, useNavigation } from "react-router";





export const useStateAction = (uri: string,) => {

  const actionData = useActionData();
  const navigation = useNavigation();
  const loading = navigation.formAction === uri;


  return {
    loading,
    actionData,

  }
}