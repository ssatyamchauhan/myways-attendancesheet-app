
module.exports = (mongoose) => {

    // structure of each blog
    // const eachBlogSchema = new mongoose.Schema({
    //     title: {
    //         type: String,
    //         required: true
    //     },
    //     body: {
    //         type: String,
    //         required: true
    //     },
    //     tags: {
    //         type: Array,
    //         required: true
    //     },
    //     created_at: {
    //         type: Date,
    //         default: Date.now
    //     },
    //     updated_at: {
    //         type: Date,
    //         default: Date.now
    //     }

    // })

    // structure of blog with author details
    const statusSchema = new mongoose.Schema({

        name_id: {
            type: String,
            required: true
        },
        name: {
            type: String,
            required: true
        },
        status: {
            type: Boolean,
            required: true
        }
    })

    return statusSchema;


}