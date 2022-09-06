import { useState } from "react";

import type { NextPage } from "next";
import Head from "next/head";
import Router from "next/router";

import config from "../src/config.json";
import { notify } from "../src/libs/notify";

export default ({}: NextPage) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState<
    {
      answerByUser: string;
    }[]
  >([]);

  const isFinishQuestions = currentQuestion + 1 === config.questions.length;

  const handleAnswerOption = (answer: string) => {
    setSelectedOptions([
      (selectedOptions[currentQuestion] = { answerByUser: answer }),
    ]);
    setSelectedOptions([...selectedOptions]);
  };

  const next = () => {
    if (selectedOptions[currentQuestion]) {
      if (isFinishQuestions) return Router.push(config.redirect);

      setCurrentQuestion(currentQuestion + 1);
    } else {
      notify(
        "Para prosseguir você precisa selecionar almenos uma alternativa!",
      );
    }
    console.log(!!selectedOptions[currentQuestion]);
  };

  return (
    <>
      <Head>
        <title>{config.title}</title>
      </Head>

      <div className="flex flex-col w-screen px-5 h-screen justify-center items-center">
        <main className="w-full sm:w-3/5">
          <header className="flex flex-col items-start w-full">
            <h1 className="mt-4 text-4xl">Antes responda</h1>
            <p className="mt-2 text-md text-slate-50/70">
              Para descobrir o método responda essas {config.questions.length}{" "}
              perguntas{" "}
            </p>
          </header>

          <section>
            <h4 className="mt-14 text-xl text-white/60">
              Pergunta {currentQuestion + 1} de {config.questions.length}
            </h4>

            <div className="mt-4 text-xl font-reading">
              {config.questions[currentQuestion].question}
            </div>

            <div className="w-full flex flex-wrap">
              {config.questions[currentQuestion].answerOptions.map(
                (answer, index) => (
                  <label
                    key={index}
                    className="flex items-center flex-1 py-4 px-5 mt-4 mr-4 border-2 cursor-pointer bg-white/5 border-white/10 rounded-xl"
                    onClick={() => handleAnswerOption(answer.answer)}
                  >
                    <input
                      type="radio"
                      name={answer.answer}
                      value={answer.answer}
                      checked={
                        answer.answer ===
                        selectedOptions[currentQuestion]?.answerByUser
                      }
                      className="w-6 h-6 bg-black"
                    />

                    <p className="ml-3 whitespace-nowrap text-white">
                      {answer.answer}
                    </p>
                  </label>
                ),
              )}
            </div>

            <button
              className="mt-7 font-medium text-lg py-3 px-10 bg-indigo-600 hover:bg-indigo-700 rounded-lg"
              onClick={() => next()}
            >
              {isFinishQuestions ? "Concluir" : "Próxima"}
            </button>
          </section>

          <footer className="mt-7">
            <p className="text-center text-sm text-white/60">
              &copy; {new Date().getFullYear()} - Todos os direitos reservados.
              Este site não faz parte nem é endossado pelo Facebook, Facebook é
              uma marca comerceial da Facebook, Inc.
            </p>
          </footer>
        </main>
      </div>
    </>
  );
};
