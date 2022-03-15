import Image from "next/image";
import Link from "next/link";
import Layout from "../components/Layout";

export default function Home({ res }) {
  return (
    <Layout page={"Crypto Watch - Home"}>
      <ul className="flex justify-around py-10">
        {res.map((crypto, index) => (
          <li
            key={index}
            className="relative hover:shadow-md p-8 border border-blue-300 rounded-3xl bg-blue-100 md:w-auto flax-1 mx-5"
          >
            <Link href={`/${crypto.id}`}>
              <a className="rounded-md">
                <div className="text-center">
                  <Image
                    src={crypto.logo_url}
                    alt={crypto.name}
                    className="mx-auto mb-6"
                    width="100"
                    height="100"
                    quality={100}
                  />
                </div>
                <h2 className="text-2xl mb-6 uppercase tracking-wider">
                  {crypto.name}
                </h2>
                <h3 className="font-bold text-2xl mb-4">
                  {parseFloat(crypto.price).toFixed(2)} USD
                </h3>
                <p>
                  1 day :{" "}
                  <span className="font-bold">
                    {parseFloat(crypto["1d"].price_change_pct * 100).toFixed(
                      2
                    ) + "%"}
                  </span>
                  {crypto["1d"].price_change_pct < 0 ? (
                    <span className="text-red-500"> &#x2798;</span>
                  ) : (
                    <span className="text-green-500"> &#x279A;</span>
                  )}
                </p>
                <p>
                  1 week :{" "}
                  <span className="font-bold">
                    {parseFloat(crypto["7d"].price_change_pct * 100).toFixed(
                      2
                    ) + "%"}
                  </span>
                  {crypto["7d"].price_change_pct < 0 ? (
                    <span className="text-red-500"> &#x2798;</span>
                  ) : (
                    <span className="text-green-500"> &#x279A;</span>
                  )}
                </p>
                <p>
                  1 month :{" "}
                  <span className="font-bold">
                    {parseFloat(crypto["30d"].price_change_pct * 100).toFixed(
                      2
                    ) + "%"}
                  </span>
                  {crypto["30d"].price_change_pct < 0 ? (
                    <span className="text-red-500"> &#x2798;</span>
                  ) : (
                    <span className="text-green-500"> &#x279A;</span>
                  )}
                </p>
                <p>
                  1 year :{" "}
                  <span className="font-bold">
                    {parseFloat(crypto["365d"].price_change_pct * 100).toFixed(
                      2
                    ) + "%"}
                  </span>
                  {crypto["365d"].price_change_pct < 0 ? (
                    <span className="text-red-500"> &#x2798;</span>
                  ) : (
                    <span className="text-green-500"> &#x279A;</span>
                  )}
                </p>
              </a>
            </Link>
          </li>
        ))}
      </ul>
    </Layout>
  );
}

export async function getStaticProps(context) {
  try {
    const res = await fetch(
      "https://api.nomics.com/v1/currencies/ticker?key=ddd7df8fd2b5d045fedcb8698ff8a298990f9ac2&ids=BTC,ETH,ATOM&interval=1d,7d,30d,365d&per-page=100&page=1"
    ).then((res) => res.json());
    return {
      props: { res },
    };
  } catch (error) {
    console.log(error);
  }
}
