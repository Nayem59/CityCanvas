import { Text, SafeAreaView, View, TextInput, Alert } from "react-native";
import React from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebaseConfig";
import { doc, getDoc, writeBatch } from "firebase/firestore";
import Input from "../components/Input";
import AppButton from "../components/AppButton";
import { AntDesign } from "@expo/vector-icons";

const SignupSchema = Yup.object({
  firstName: Yup.string()
    .min(2, "Too short")
    .max(20, "Too long")
    .required("Required"),
  lastName: Yup.string()
    .min(2, "Too short")
    .max(30, "Too long")
    .required("Required"),
  username: Yup.string()
    .min(2, "Too short")
    .max(20, "Too long")
    .required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string()
    .min(8, "Too short")
    .max(20, "Too long")
    .required("Required")
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
      "Must include at least one letter, one number and one special character"
    ),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Required"),
});

const SignUp = ({ navigation }) => {
  const register = (firstName, lastName, username, email, password) => {
    const batch = writeBatch(db);
    const userData = { firstName, lastName, username, email };
    const docRef = doc(db, "usernames", username);

    getDoc(docRef).then((snapShot) => {
      if (snapShot.exists()) {
        Alert.alert("username already exists");
      } else {
        createUserWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
            const uid = userCredential.user.uid;
            return uid;
          })
          .then((uid) => {
            const writeUsers = doc(db, "users", uid);
            const writeUsernames = doc(db, "usernames", userData.username);

            batch.set(writeUsers, userData);
            batch.set(writeUsernames, { uid });
            batch.commit();
          })
          .catch((error) => {
            Alert.alert("email already exists");
          });
      }
    });
  };

  return (
    <SafeAreaView className="bg-white h-full">
      <Formik
        initialValues={{
          firstName: "",
          lastName: "",
          username: "",
          email: "",
          password: "",
          confirmPassword: "",
        }}
        validationSchema={SignupSchema}
        onSubmit={({ firstName, lastName, username, email, password }) => {
          register(firstName, lastName, username, email, password);
        }}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          onBlur,
          values,
          errors,
          touched,
        }) => (
          <View className="flex items-center justify-center w-10/12 mx-auto mb-10">
            <Text className="mt-10 mb-10 text-3xl text-center">
              <Text className="font-bold text-pink">Register</Text>
            </Text>
            <View className="w-full">
              <TextInput
                placeholder="First name"
                value={values.firstName}
                onChangeText={handleChange("firstName")}
                onBlur={handleBlur("firstName")}
                autoCapitalize="none"
                autoCorrect={false}
                className="w-full p-3 py-4 my-2 border rounded-lg rounded-full border-stone-300 focus:border-pink"
              />
              {errors.firstName && touched.firstName && (
                <View className="flex flex-row justify-start ml-2 ">
                  <AntDesign name="exclamationcircleo" size={20} color="red" />
                  <Text className="ml-2 text-red-600">{errors.firstName}</Text>
                </View>
              )}
            </View>

            <View className="w-full">
              <TextInput
                placeholder="Last name"
                value={values.lastName}
                onChangeText={handleChange("lastName")}
                onBlur={handleBlur("lastName")}
                autoCapitalize="none"
                className="w-full p-3 py-4 my-2 border rounded-lg rounded-full border-stone-300 focus:border-pink"
              />
              {errors.lastName && touched.lastName && (
                <View className="flex flex-row justify-start ml-2 ">
                  <AntDesign name="exclamationcircleo" size={20} color="red" />
                  <Text className="ml-2 text-red-600">{errors.lastName}</Text>
                </View>
              )}
            </View>

            <View className="w-full">
              <TextInput
                placeholder="Username"
                value={values.username}
                onChangeText={handleChange("username")}
                onBlur={handleBlur("username")}
                autoCapitalize="none"
                className="w-full p-3 py-4 my-2 border rounded-lg rounded-full border-stone-300 focus:border-pink"
              />
              {errors.username && touched.username && (
                <View className="flex flex-row justify-start ml-2 ">
                  <AntDesign name="exclamationcircleo" size={20} color="red" />
                  <Text className="ml-2 text-red-600">{errors.username}</Text>
                </View>
              )}
            </View>
            <View className="w-full">
              <TextInput
                placeholder="email"
                value={values.email}
                onChangeText={handleChange("email")}
                onBlur={handleBlur("email")}
                autoCapitalize="none"
                className="w-full p-3 py-4 my-2 border rounded-lg rounded-full border-stone-300 focus:border-pink"
              />
              {errors.email && touched.email && (
                <View className="flex flex-row justify-start ml-2 ">
                  <AntDesign name="exclamationcircleo" size={20} color="red" />
                  <Text className="ml-2 text-red-600">{errors.email}</Text>
                </View>
              )}
            </View>
            <View className="w-full">
              <TextInput
                placeholder="password"
                value={values.password}
                onChangeText={handleChange("password")}
                onBlur={handleBlur("password")}
                autoCapitalize="none"
                secureTextEntry
                className="w-full p-3 py-4 my-2 border rounded-lg rounded-full border-stone-300 focus:border-pink"
              />
              {errors.password && touched.password && (
                <View className="flex flex-row justify-start ml-2 ">
                  <AntDesign name="exclamationcircleo" size={20} color="red" />
                  <Text className="ml-2 text-red-600">{errors.password}</Text>
                </View>
              )}
            </View>
            <View className="w-full">
              <TextInput
                placeholder="confirm password"
                value={values.confirmPassword}
                onChangeText={handleChange("confirmPassword")}
                onBlur={handleBlur("confirmPassword")}
                autoCapitalize="none"
                secureTextEntry
                className="w-full p-3 py-4 my-2 border rounded-lg rounded-full border-stone-300 focus:border-pink"
              />
              {errors.confirmPassword && touched.confirmPassword && (
                <View className="flex flex-row justify-start ml-2 ">
                  <AntDesign name="exclamationcircleo" size={20} color="red" />
                  <Text className="ml-2 text-red-600">
                    {errors.confirmPassword}
                  </Text>
                </View>
              )}
            </View>
            <AppButton
              handlePress={handleSubmit}
              title="Sign Up"
              primary={true}
              icon={"adduser"}
            />
            <View className="w-100">
              <Text className="mt-10 mb-2 text-stone-500">
                Already have an account?
              </Text>
            </View>
            <AppButton
              handlePress={() => navigation.navigate("Login")}
              title="Back to sign in"
              primary={false}
              icon={"arrowleft"}
            />
          </View>
        )}
      </Formik>
    </SafeAreaView>
  );
};

export default SignUp;
