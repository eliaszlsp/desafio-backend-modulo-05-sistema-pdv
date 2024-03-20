const aws = require("aws-sdk");

const endpoint = new aws.Endpoint(process.env.ENDPOINT_BLAZE);

const s3 = new aws.S3({
    endpoint,
    credentials: {
        accessKeyId: process.env.KEY_ID,
        secretAccessKey: process.env.APP_KEY,
    },
});

const uploudImagem = async (path, buffer, mimetype) => {
    const imagem = await s3
        .upload({
            Bucket: process.env.BLAZE_NAME,
            Key: path, //caminho com nome da imagem
            Body: buffer, // imagem "criptografada"
            ContentType: mimetype, // tipo da imagem
        })
        .promise();

    return {
        path: imagem.Key,
        url: `https://${process.env.BLAZE_NAME}.${process.env.ENDPOINT_BLAZE}/${imagem.Key}`,
    };
};

const deleteImagem = async (path) => {
    await s3
        .deleteObject({
            Bucket: process.env.BLAZE_NAME,
            Key: path, //caminho com nome da imagem
        })
        .promise();
};

module.exports = { uploudImagem, deleteImagem };
