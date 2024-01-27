"use client";
import { useState, useRef, useEffect } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "@/firebase/config";
import { getAuth } from "firebase/auth";
import { useRouter } from "next/navigation";


import {
  XCircleIcon,
  ArrowUpCircleIcon,
  ArrowDownCircleIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";

type SurveyItemType = "question" | "text";

type SurveyItem = {
  type: SurveyItemType;
  content: string;
};

const defaultText: SurveyItem = { type: "text", content: "" };
const defaultQuestion: SurveyItem = { type: "question", content: "" };
const maxQuestions = 3; // Maximum number of questions

export default function Page() {
  const [title, setTitle] = useState("");
  const [items, setItems] = useState<SurveyItem[]>([
    defaultText,
    defaultQuestion,
  ]);
  const [error, setError] = useState<string | null>(null);
  const itemRefs = useRef<(HTMLTextAreaElement | null)[]>([]);
  const router = useRouter();  // Instantiate the router object

  useEffect(() => {
    itemRefs.current = itemRefs.current.slice(0, items.length);
  }, [items]);

  const autoGrowTextArea = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    event.target.style.height = "auto";
    event.target.style.height = `${event.target.scrollHeight}px`;
  };

  const addItem = (type: SurveyItemType) => {
    // Count the number of questions in the items array
    const questionCount = items.filter(
      (item) => item.type === "question"
    ).length;

    if (type === "question" && questionCount >= maxQuestions) {
      setError("Maximum number of questions reached.");
      return;
    }
    setError(null);

    setItems([...items, { type, content: "" }]);
    setTimeout(() => itemRefs.current[items.length]?.focus(), 0);
  };

  const removeItem = (index: number) => {
    const newItems = items.filter((_, i) => i !== index);
    setItems(newItems);
    setError(null);
  };

  const moveItemUp = (index: number) => {
    if (index === 0) return;
    const newItems = [...items];
    [newItems[index - 1], newItems[index]] = [
      newItems[index],
      newItems[index - 1],
    ];
    setItems(newItems);
  };

  const moveItemDown = (index: number) => {
    if (index === items.length - 1) return;
    const newItems = [...items];
    [newItems[index + 1], newItems[index]] = [
      newItems[index],
      newItems[index + 1],
    ];
    setItems(newItems);
  };

  const handleEnterPress = (
    index: number,
    event: React.KeyboardEvent<HTMLTextAreaElement>
  ) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      if (index === items.length - 1) {
        addItem("question");
      } else {
        itemRefs.current[index + 1]?.focus();
      }
    }
  };

  // Add survey to firestore
  const createSurvey = async (title: string, survey_content: SurveyItem[]) => {
    const auth = getAuth();
    const user = auth.currentUser;

    if (user && title !== "") {
      try {
        await addDoc(collection(db, 'surveys'), {
          survey_title: title,
          survey_content: survey_content,
          createdBy: user.uid
        });
        console.log("Survey created successfully");
        router.push('/dashboard/');  // Redirect to the dashboard
      } catch (error) {
        console.error("Error creating survey: ", error);
        setError("Failed to create survey."); // Display error to the user
      }
    } else {
      setError("User not authenticated or title is empty.");
    }
  };


  return (
    <div className="flex justify-center">
    <div className="flex-col space-y-4  p-5 m-1 w-[90%] max-w-[700px]">
      <div className="flex justify-end">
        <Link href="/dashboard/">
          <div className="w-8 h-8">
            <XCircleIcon />
          </div>
        </Link>
      </div>
      <div className="flex items-center justify-between">
        <textarea
          placeholder="Survey Title"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
            autoGrowTextArea(e);
          }}
          onKeyDown={(e) => handleEnterPress(-1, e)}
          className="w-full p-1 mr-6 border-b border-solid focus:outline-none focus:border-gray-800 overflow-hidden resize-none text-3xl font-semibold tracking-tight transition-colors first:mt-0"
          rows={1}
          style={{ minHeight: "auto" }}
        ></textarea>
      </div>

      {items.map((item, index) => (
        <div key={index} className="flex flex-col py-4">
          <div className="flex justify-between items-center">
            <textarea
              ref={(el) => el && (itemRefs.current[index] = el)}
              placeholder={
                item.type === "question"
                  ? "Write a question here..."
                  : "Write some text here..."
              }
              value={item.content}
              onChange={(e) => {
                const updatedItems = items.map((it, idx) =>
                  idx === index ? { ...it, content: e.target.value } : it
                );
                setItems(updatedItems);
                autoGrowTextArea(e);
              }}
              onKeyDown={(e) => handleEnterPress(index, e)}
              className="p-1 mr-6 border-b border-solid w-full resize-none overflow-hidden focus:outline-none focus:border-gray-800 text-xl font-semibold tracking-tight"
              rows={1}
              style={{ minHeight: "auto" }}
            />
            <div className="flex mb-2 space-x-4">
              <button
                onClick={() => moveItemUp(index)}
                className="bg-blue-200 rounded hover:bg-blue-400 h-8 w-8 text-black"
              >
                <ArrowUpCircleIcon />
              </button>
              <button
                onClick={() => moveItemDown(index)}
                className="bg-blue-200 rounded hover:bg-blue-400 h-8 w-8 text-black"
              >
                <ArrowDownCircleIcon />
              </button>
              <button
                onClick={() => removeItem(index)}
                className="bg-red-200 h-8 w-8 rounded hover:bg-red-400"
              >
                <XCircleIcon />
              </button>
            </div>
          </div>
          {item.type === "question" && (
            <textarea
              placeholder="Text input area"
              className="p-1 my-2 border-2 border-gray-400 rounded-lg resize-none overflow-hidden"
              onChange={(e) => {
                autoGrowTextArea(e);
              }}
              rows={3}
              style={{ minHeight: "auto" }}
            />
          )}
        </div>
      ))}

      <div className="flex justify-center space-x-4">
        <button
          onClick={() => addItem("question")}
          className="bg-blue-200 px-4 py-2 rounded hover:bg-blue-400"
        >
          Add Question
        </button>
        <button
          onClick={() => addItem("text")}
          className="bg-green-200 px-4 py-2 rounded hover:bg-green-400"
        >
          Add Text
        </button>
      </div>

      <div className="flex justify-center">
        {error && (
          <div className="bg-red-200 text-gray-700 py-4 px-3 rounded-md">
            {error}
          </div>
        )}
      </div>
      <div className="flex h-20 p-2 justify-end items-center">
        <button className="bg-blue-200 font-medium px-5 py-2 rounded-lg hover:bg-blue-400 mr-4">
          Preview
        </button>
        <button onClick={() => createSurvey(title, items)} className="bg-green-200 font-medium px-5 py-2 rounded-lg hover:bg-green-500 mr-4">
          Publish
        </button>
      </div>
    </div>
    </div>
  );
}
