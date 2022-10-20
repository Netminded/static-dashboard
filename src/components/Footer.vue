<template>
  <footer>
    <p>
      Copyright ©
      <a href="https://netminded.co.uk" target="_blank">NetMinded</a>, a trading
      name of SeeThru Networks.
    </p>
    <a href="https://netminded.co.uk/privacy" target="_blank">Privacy</a>
  </footer>
</template>

<style>
footer {
  background: #28242d;
  padding: 20px;
  font-family: "Karla", sans-serif;
  font-weight: 400;
  font-size: 14px;
  color: #ffffff;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}

@media screen and (max-width: 550px) {
  footer {
    flex-direction: column-reverse;
    text-align: center;
  }
}

@media screen and (max-width: 550px) {
  footer p {
    padding-bottom: 10px;
  }
}

footer a {
  color: #ffffff;
  text-decoration: none;
  font-family: "Poppins", sans-serif;
  font-weight: 400;
}

@media screen and (max-width: 550px) {
  footer a:nth-child(2) {
    padding: 10px;
  }
}
</style>
