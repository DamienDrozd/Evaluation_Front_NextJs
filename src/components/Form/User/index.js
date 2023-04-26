import Input from "@/components/UI/Input";

const Index = ({userForm, handleChange, edit}) => {
  return (
    <>
        <Input
          label="Prénom"
          type="firstName"
          name="firstName"
          placeholder="veuillez saisir votre prénom"
          isRequired={true}
          onChange={(e) => handleChange(e)}
          value={userForm?.firstName}
        />
        <Input
          label="Nom"
          type="lastName"
          name="lastName"
          placeholder="veuillez saisir votre nom"
          isRequired={true}
          onChange={(e) => handleChange(e)}
          value={userForm?.lastName}
        />
        <Input
          label="Email"
          type="email"
          name="email"
          placeholder="veuillez saisir votre email"
          isRequired={true}
          onChange={(e) => handleChange(e)}
          value={userForm?.email}
        />
        {!edit && (
          <>
            <Input
              label="Mot de passe"
              type="password"
              name="password"
              placeholder="veuillez saisir votre mot de passe"
              isRequired={true}
              onChange={(e) => handleChange(e)}
              value={userForm?.password}
            />
            <Input
              label="Confirmation du mot de passe"
              type="password"
              name="confirmPassword"
              placeholder="veuillez confirmer votre mot de passe"
              isRequired={true} 
              onChange={(e) => handleChange(e)}
              value={userForm?.confirmPassword}
            />
          </>
        )}
        <Input
          label="Téléphone"
          type="phone"
          name="phone"
          placeholder="veuillez saisir votre numéro de téléphone"
          isRequired={true}
          onChange={(e) => handleChange(e)} 
          value={userForm?.phone}
        />
        <Input
          label="Addresse"             
          type="address"
          name="address"
          placeholder="veuillez saisir votre adresse"   
          isRequired={true}
          onChange={(e) => handleChange(e)}
          value={userForm?.address}
        />
        <Input
          label="Code postal"
          type="postCode"
          name="postCode"   
          placeholder="veuillez saisir votre code postal" 
          isRequired={true}
          onChange={(e) => handleChange(e)} 
          value={userForm?.postCode}
        />
        <Input
          label="Ville"
          type="city"
          name="city"
          placeholder="veuillez saisir votre ville"
          isRequired={true} 
          onChange={(e) => handleChange(e)}
          value={userForm?.city}
        />
    </>
  );
}

export default Index;
