import { authAxios } from "../axios";

export const syncShopifyPartnerData = async (isInitialSync) => {
  try {
    const axios = authAxios();
    const res = await axios({
      method: "POST",
      url: "puppeteer/redis/createRedisJob",
      data: {
        isInitialSync,
      },
    });

    const jobId = res.data.id;

    let finalResult;

    const checkDataRedis = async (id) => {
      let redisResult;
      try {
        redisResult = await axios({
          method: "POST",
          url: `puppeteer/redis/job/${id}`,
        });
      } catch (err) {
        console.log(err);
        // console.log("error", err.response.data.message);
      }

      if (
        redisResult.data.state === "completed" &&
        redisResult.data.data !== null
      ) {
        finalResult = redisResult.data;
      } else if (redisResult.data.state === "failed") {
        throw new Error();
      } else {
        // Delay the checking by one second
        await new Promise((resolve) => setTimeout(resolve, 1000));
        await checkDataRedis(id);
      }
    };

    await checkDataRedis(jobId);

    if (finalResult.state === "completed") {
      return { message: "Finished Sync" };
    }
  } catch (err) {
    console.log(err);
    // console.log("error", err.response.data.message);
    return { message: "Error With Sync" };
  }
};
