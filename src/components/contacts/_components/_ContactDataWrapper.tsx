import { ReactNode } from "react";
import { ContactDataProvider } from "./ContactDataProvider"

const ContactDataWrapper = ({ children }: { children: ReactNode }) => {
  return (
    <ContactDataProvider>
      {children}
    </ContactDataProvider>
  )
}

export default ContactDataWrapper;