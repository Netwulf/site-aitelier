import { useParams, useNavigate } from "react-router-dom";
import { CloneChat, getCloneById } from "@/components/CloneChat";

const CloneChatPage = () => {
  const { cloneId } = useParams<{ cloneId: string }>();
  const navigate = useNavigate();

  const clone = cloneId ? getCloneById(cloneId) : undefined;

  // Clone not found - redirect to playground
  if (!clone) {
    return (
      <div className="fixed inset-0 bg-[#0a0a0a] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-display text-warm-ivory mb-4">
            Clone not found
          </h1>
          <p className="text-warm-ivory/50 mb-6">
            The clone "{cloneId}" doesn't exist or is not available.
          </p>
          <button
            onClick={() => navigate("/playground")}
            className="px-6 py-3 bg-tech-olive text-void-black font-mono-v2 text-sm
                     hover:bg-tech-olive/90 transition-colors"
          >
            Back to Playground
          </button>
        </div>
      </div>
    );
  }

  return <CloneChat clone={clone} fullscreen />;
};

export default CloneChatPage;
