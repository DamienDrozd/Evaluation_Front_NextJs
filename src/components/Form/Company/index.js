import Input from "@/components/UI/Input";

const Index = ({userForm, handleChange}) => {
  return (
    <>
        <Input
            label="Nom de l'entreprise"    
            type="companyName"  
            name="companyName"
            placeholder="veuillez saisir le nom de votre entreprise"
            isRequired={true}
            onChange={(e) => handleChange(e)}
            value={userForm?.companyName}
        />
        {/* companySiret */}
        <Input
            label="Siret"
            type="companySiret"     
            name="companySiret"
            placeholder="veuillez saisir le siret de votre entreprise"
            isRequired={true}
            onChange={(e) => handleChange(e)}
            value={userForm?.companySiret}
        />
        {/* companyAddress */}
        <Input
            label="Addresse de l'entreprise"
            type="companyAddress"     
            name="companyAddress"
            placeholder="veuillez saisir l'addresse de votre entreprise"
            isRequired={true}
            onChange={(e) => handleChange(e)}
            value={userForm?.companyAddress}
        />
        {/* companyCity */}
        <Input
            label="Ville de l'entreprise"
            type="companyCity"     
            name="companyCity"
            placeholder="veuillez saisir la ville de votre entreprise"
            isRequired={true}
            onChange={(e) => handleChange(e)}
            value={userForm?.companyCity}
        />
        {/* companypostcode */}
        <Input
            label="Code postal de l'entreprise"
            type="companyPostcode"     
            name="companyPostcode"
            placeholder="veuillez saisir le code postal de votre entreprise"
            isRequired={true}
            onChange={(e) => handleChange(e)}
            value={userForm?.companyPostcode}
        />
        {/* companyStatus */}
        <Input
            label="Statut de l'entreprise"
            type="companyStatus"     
            name="companyStatus"
            placeholder="veuillez saisir le statut de votre entreprise"
            isRequired={true}
            onChange={(e) => handleChange(e)}
            value={userForm?.companyStatus}
        />
    </>
  );
}

export default Index;