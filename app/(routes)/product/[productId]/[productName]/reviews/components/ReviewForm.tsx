// user can add review to product
import React, { useState } from "react";
import axios from "axios";
import localstorage from "@/lib/LocalStorageManager";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useRouter } from "next/navigation";

import { Star } from "lucide-react";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import ImageUpload from "@/components/ui/image-upload";
import AnimatedText from "@/components/ui/AnimatedText";
import { toast } from "react-toastify";

const formSchema = z.object({
  comment: z.string().nonempty("Description is required").max(200),
  images: z.object({ url: z.string().nonempty("Image is required") }).array(),
});

type ReviewFormProps = {
  productId: string;
};

type Image = {
  url: string;
};
const ReviewForm: React.FC<ReviewFormProps> = ({ productId }) => {
  const router = useRouter();
  const [rating, setRating] = useState<number>(0);
  const [hover, setHover] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      comment: "",
      images: [],
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const token = localstorage.getItemWithExpiration("token");
    // convert values and rating to data object
    const data = {
      ...values,
      rating,
    };
    setLoading(true);
    await axios
      .post(
        `${process.env.NEXT_PUBLIC_API_URL}/review/${productId}/${process.env.NEXT_PUBLIC_STORE_ID}/create`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(() => {
        setLoading(false);
        toast("Review added successfully", {
          type: "success",
        });
        router.push(`/`);
      })
      .catch((err) => {
        setLoading(false);

        toast("Some thing went wrong", {
          type: "error",
        });
      });
  };
  const title = "Add A Review";
  return (
    <div className=" flex justify-center items-center mt-16 md:mt-0">
      <div className="flex-col w-full p-5 md:w-1/2">
        <div className="flex">
          {title.split("").map((letter, index) => (
            <AnimatedText key={index}>
              {letter === " " ? "\u00A0" : letter}
            </AnimatedText>
          ))}
        </div>
        <div className="flex items-center justify-center">
          {[...Array(5)].map((_star, index) => (
            <label key={index}>
              <Input
                type="radio"
                value={index + 1}
                onClick={() => setRating(index + 1)}
                className="hidden"
              />
              <Star
                onMouseEnter={() => setHover(index + 1)}
                onMouseLeave={() => setHover(0)}
                className={`${
                  index + 1 <= (hover || rating)
                    ? "text-yellow-400"
                    : "text-gray-400"
                }`}
              />
            </label>
          ))}
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="flex justify-center mt-2">
              <FormField
                control={form.control}
                name="images"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <ImageUpload
                        value={field.value.map((image: Image) => image.url)}
                        onChange={(url) =>
                          field.onChange([...field.value, { url }])
                        }
                        onRemove={() => field.onChange("")}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="comment"
              defaultValue={""}
              render={({ field }) => (
                <FormItem>
                  <label htmlFor="description">Feedback</label>
                  <Textarea className="border-2 border-gray-300" {...field} />

                  <FormControl></FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-end">
              <Button className="mt-2 " type="submit">
                {loading ? "Loading..." : "Submit"}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default ReviewForm;
