import React from "react";
import {
  EmailShareButton,
  EmailIcon,
  FacebookShareButton,
  FacebookIcon,
  TwitterShareButton,
  TwitterIcon,
  WhatsappShareButton,
  WhatsappIcon,
} from "next-share";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import IconButton from "./ui/icon-button";
import { Share2 } from "lucide-react";
import { Product } from "@/type";
import Head from "next/head";

interface ShareDialogProps {
  data: Product;
}

const generateOgTags = (data: Product) => {
  return (
    <Head>
      <title>{data.name}</title>
      <meta property="og:title" content={data.name} />
      <meta property="og:description" content={data.description} />
      {/* <meta property="og:image" content={data.Images[0]?.url || ""} /> */}
      <meta
        property="og:url"
        content={`${process.env.NEXT_PUBLIC_BASE_URL}/product/${data.id}/${data.name}`}
      />
      <meta name="twitter:card" content="summary_large_image" />
    </Head>
  );
};

const ShareDialog: React.FC<ShareDialogProps> = ({ data }) => {
  const url = `${process.env.NEXT_PUBLIC_BASE_URL}/product/${data.id}/${data.name}`;
  return (
    <Dialog>
      <DialogTrigger>
        <IconButton
          icon={
            <Share2 size={15} className="text-gray-600 hover:text-blue-600" />
          }
        />
      </DialogTrigger>
      <DialogContent className="max-w-[150px] sm:max-w-md">
        {generateOgTags(data)}
        <p className="text-center text-[22px] font-semibold">Share on</p>
        <div className="flex items-center justify-around gap-2 flex-col sm:flex-row ">
          <EmailShareButton
            url={url}
            subject={"I ♥ this product on Ts-Ecom"}
            body={`${data.name} ${data.description} Here's the link `}>
            <EmailIcon
              size={64}
              bgStyle={{
                backgroundColor: "white",
              }}
              round
            />
            <p>Email</p>
          </EmailShareButton>
          <FacebookShareButton
            url={url}
            quote={`I ♥ this product on Ts-Ecom ${data.name} ${data.description} Here's the link `}
            hashtag={"#nextshare"}>
            <FacebookIcon size={64} round />
            <p>Face book</p>
          </FacebookShareButton>
          <TwitterShareButton
            url={`${process.env.NEXT_PUBLIC_BASE_URL}/product/${data.id}/${data.name}`}
            title={`I ♥ this product on Ts-Ecom ${data.name} ${data.description} Here's the link `}>
            <TwitterIcon size={64} round />
            <p>Twitter</p>
          </TwitterShareButton>
          <WhatsappShareButton
            url={url}
            title={`I ♥ this product on Ts-Ecom ${data.name} ${data.description} Here's the link `}
            separator=":: ">
            <WhatsappIcon size={64} round />
            <p>Whatsapp</p>
          </WhatsappShareButton>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ShareDialog;
