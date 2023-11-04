"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddTopic() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
//上記の2つのconst~でtitleとdescriptionの状態変数を初期化しています。これらの変数はフォームの入力値を保持します。
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
//const handleSubmit:フォームの送信時に実行されるイベントハンドラ関数です。async で修飾されており、非同期操作を行うことができます。
        if(! title || !description) {
            alert("Title and description are required.");
            return;
         }

         try {
           const res = await fetch('http://localhost:3000/api/topics', {
                method: "POST",
                headers: {
                    "Content-type": "applocation/json"
                },
                body: JSON.stringify({ title, description }),
            });
//fetch を使用して指定されたAPIエンドポイントにデータを送信します。POST メソッドを使用してデータを送信します。
            if (res.ok) {
                router.push("/");
            }else {
                throw new Error("Failed to create a topic");
            }
            
         }catch (error) {
            console.log(error);
         }
    };
//fetch のレスポンスが成功した場合（res.ok が true）、router.push("/") を使用して新しいページにリダイレクトします。エラーが発生した場合、エラーメッセージがコンソールに表示されます。   
    return (
    <form onSubmit= {handleSubmit} className="flex flex-col gap-3">
        <input 
        onChange={(e) => setTitle(e.target.value)}
        value={title}
          className="border border-slate-500 px-8 py-2" 
          type="text"
          placeholder="Topic Title"
         />

         <input 
         onChange={(e) => setDescription(e.target.value)}
         value={description}
          className="border border-slate-500 px-8 py-2" 
          type="text"
          placeholder="Topic Description"
         />
         
        <button type="submit" className="bg-green-600 font-bold
        text-white py-3 px-6 w-fit">
        Add Topic
        </button>
    </form>
    );
}