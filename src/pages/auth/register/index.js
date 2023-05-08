import Link from "next/link";
import Title from '@/components/UI/Title';
import ButtonLink from '@/components/UI/ButtonLink';


const Index = () => {


  return (
    <>
      <Title title="Inscription" Level="h1" />
        <div className="form__group">
          <div>
            <ButtonLink title="Je suis un freelance" className={"btn__register__freelance"} link="/auth/register/freelance"  />
          </div>
          <div>
            <ButtonLink title="Je suis une entreprise" className={"btn__register__company"} link="/auth/register/company"  />
          </div>
        </div>
       
      <p>
        Vous avez déjà un compte ? <ButtonLink title="Se connecter" className={"btn__link"} link="/auth/login"  />
      </p>
    </>
  );
}

export default Index;
