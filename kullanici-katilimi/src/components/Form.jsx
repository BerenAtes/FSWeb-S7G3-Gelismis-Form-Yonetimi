import { useState, useEffect } from "react";
import axios from "axios";
import * as yup from "yup";

const schema = yup.object().shape({
  first_name: yup
    .string()
    .min(3, "İsim en az 3 karaktere sahip olmalıdır.")
    .required("İsim alanının doldurulması zorunludur."),
  last_name: yup
    .string()
    .min(3, "Soyadınız en az 3 karaktere sahip olmalıdır.")
    .required("Soyadı alanının doldurulması zorunludur."),
  email: yup
    .string()
    .email("Lütfen geçerli bir mail adresi giriniz.")
    .required("Mail adresinin girilmesi zorunludur."),
  gender: yup
    .string()
    .oneOf(["male", "female"], "Cinsiyetinizi seçmelisiniz.")
    .required("Cinsiyet gereklidir."),
  agreement: yup
    .boolean()
    .oneOf([true], "Kullanım koşullarını kabul etmelisiniz."),
});

export default function Form(props) {
  const { addUser } = props;
  const initialForm = {
    first_name: "",
    last_name: "",
    email: "",
    gender: "",
    agreement: false,
  };

  const [formData, setFormData] = useState(initialForm);
  const [formErrors, setFormErrors] = useState({});
  const [isDisabled, setIsDisabled] = useState(true);
  useEffect(() => {
    kontrolFonksiyonuButunForm(formData);
  }, [formData]);

  const mySubmitHandler = (e) => {
    e.preventDefault();
    if (!isDisabled) {
      axios
        .post("https://reqres.in/api/users", formData)
        .then((response) => {
          addUser(response.data);
          setFormData(initialForm);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  const kontrolFonksiyonuAlanlar = (name, value) => {
    yup
      .reach(schema, name)
      .validate(value)
      .then((formData) => {
        const newErrorState = {
          ...formErrors,
          [name]: "",
        };
        setFormErrors(newErrorState);
      })
      .catch((err) => {
        const newErrorState = {
          ...formErrors,
          [name]: err.errors[0],
        };
        setFormErrors(newErrorState);
      });
  };
  const kontrolFonksiyonuButunForm = (formVerileri) => {
    schema.isValid(formVerileri).then((valid) => {
      setIsDisabled(!valid);
    });
  };

  const myChangeHandler = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;

    const newState = {
      ...formData,
      [name]: newValue,
    };

    setFormData(newState);
    kontrolFonksiyonuAlanlar(name, newValue);
  };

  return (
    <form onSubmit={mySubmitHandler}>
      <div className="space-y-12">
        <div>
          <h2 className="text-base font-semibold leading-7 text-gray-900">
            Sayfamıza Hoşgeldiniz
          </h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">
            Aşağıda verilmiş bilgileri eksiksiz olarak doldurmanız
            gerekmektedir.
          </p>

          <div className="mt-10 flex flex-col">
            <div className="mb-10">
              <label
                htmlFor="first_name"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                İsim
              </label>
              <div className="mt-2">
                <input
                  id="first_name"
                  type="text"
                  name="first_name"
                  data-cy="first_name"
                  value={formData.first_name}
                  onChange={myChangeHandler}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                {formErrors.first_name && (
                  <div data-cy="fname-error" className="text-red-600">
                    {formErrors.first_name}
                  </div>
                )}
              </div>
            </div>

            <div className="mb-10">
              <label
                htmlFor="last_name"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Soyisim
              </label>
              <div className="mt-2">
                <input
                  data-cy="last_name"
                  id="last_name"
                  type="text"
                  name="last_name"
                  value={formData.last_name}
                  onChange={myChangeHandler}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
              {formErrors.last_name && (
                <div data-cy="lname-error" className="text-red-600">
                  {formErrors.last_name}
                </div>
              )}
            </div>

            <div className="sm:col-span-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Mail adresi
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  type="email"
                  name="email"
                  data-cy="email"
                  value={formData.email}
                  onChange={myChangeHandler}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 "
                />
              </div>
              {formErrors.email && (
                <div data-cy="errors" className="text-red-600">
                  {formErrors.email}
                </div>
              )}
            </div>
            <div className="sm:col-span-4 mt-10 w-1/2 mx-auto">
              <label
                htmlFor="gender"
                className="block text-sm font-medium leading-6 text-gray-900 mb-2"
              >
                {" "}
                Cinsiyet
              </label>
              <div>
                <select
                  name="gender"
                  data-cy="gender"
                  value={formData.gender}
                  onChange={myChangeHandler}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                >
                  <option value="">Lütfen seçim yapınız!</option>
                  <option value="female">Kadın</option>
                  <option value="male">Erkek</option>
                </select>
              </div>
              {formErrors.gender && (
                <div data-cy="errors" className="text-red-600">
                  {formErrors.gender}
                </div>
              )}
            </div>
            <div className="sm:col-span-4 mt-10 w-1/2 mx-auto">
              <label htmlFor="agreement">
                <b>Üye formunda belirtilen bütün koşulları kabul ediyorum.</b>
              </label>
              <input
                data-cy="agreement"
                id="agreement"
                type="checkbox"
                name="agreement"
                checked={formData.agreement}
                onChange={myChangeHandler}
                className="ml-5"
              />
              {formErrors.agreement && (
                <div data-cy="errors" className="text-red-600">
                  {formErrors.agreement}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-end gap-x-6">
        <button
          disabled={isDisabled}
          data-cy="submit"
          type="submit"
          className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Kaydet
        </button>
      </div>
    </form>
  );
}
